import { useQuery } from "@apollo/client";
import ReturnBook from "./returnBook";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { formatInTimeZone } from "date-fns-tz";
import dayjs from "dayjs";
import { GET_BORROWED_BOOK_INFO } from "../query/book/bookGet";

interface Book {
  date: Date;
  book: {
    id: string;
    title: string;
    author: string;
    image_url: string;
    description: string;
  };
}

type Props = {
  borrowed_books: Array<Book>;
};

interface BookId {
  id: number;
  borrowed_book_id: number;
  borrowing_user_id: number;
}

type BookIds = {
  bookId: Array<BookId>;
};

const BorrowedBook: React.FC<BookIds> = ({ bookId }) => {
  const borrowedUserIds =
    bookId && bookId.map((bookid) => bookid.borrowing_user_id);
  const { data } = useQuery<Props>(GET_BORROWED_BOOK_INFO, {
    variables: { id: borrowedUserIds },
  });

  const borrowedbooks = !data ? [] : data.borrowed_books;

  const limitDate = (date: Date) => {
    const now = dayjs();
    const ActualDate = now.format();
    const BorrowDate = dayjs(date);
    const ReturnDate = dayjs(BorrowDate).add(2, "w").format();
    const DateDiff = dayjs(ReturnDate).diff(dayjs(ActualDate), "day");
    return (
      <>
        <div>
          {formatInTimeZone(
            new Date(dayjs(date).add(2, "w").format()),
            "JST",
            "yyyy年MM月dd日"
          )}
        </div>
      </>
    );
  };
  return (
    <>
      {borrowedUserIds && borrowedUserIds.length > 0 ? (
        <Grid container spacing={4} mt={0} px={4}>
          {borrowedbooks &&
            borrowedbooks.map((borrowedbook) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                justify-content="center"
                key={borrowedbook.book.id}
              >
                <Card sx={{ maxWidth: 400, height: 600 }}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={borrowedbook.book.image_url}
                    alt="本の表紙"
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {borrowedbook.book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {borrowedbook.book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      返却期限：
                      {limitDate(borrowedbook.date)}
                    </Typography>
                  </CardContent>
                  <div>
                    <ReturnBook bookId={borrowedbook.book.id} />
                  </div>
                </Card>
              </Grid>
            ))}
        </Grid>
      ) : (
        <div>借りている本はありません</div>
      )}
    </>
  );
};

export default BorrowedBook;
