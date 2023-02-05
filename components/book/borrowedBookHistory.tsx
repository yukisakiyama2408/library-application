import { useQuery } from "@apollo/client";
import { GET_BORROWED_BOOK_HISTORY } from "../../query/book/bookGet";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";

interface Book {
  id: string;
  title: string;
  author: string;
  image_url: string;
  description: string;
}

type Props = {
  books: Array<Book>;
};

interface BookId {
  id: number;
  borrowed_book_id: number;
}

type BookIds = {
  bookId: Array<BookId>;
};

const BorrowedBookHitory: React.FC<BookIds> = ({ bookId }) => {
  const borrowedBookIds =
    bookId && bookId.map((bookid) => bookid.borrowed_book_id);
  const { data } = useQuery<Props>(GET_BORROWED_BOOK_HISTORY, {
    variables: { id: borrowedBookIds },
  });

  const book_histories = !data ? [] : data.books;

  return (
    <>
      {borrowedBookIds && borrowedBookIds.length > 0 ? (
        <div>
          <Grid container spacing={4} mt={0} px={4}>
            {/* <div>合計{borrowedBookIds.length}冊読みました</div> */}
            {book_histories.map((book) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                justify-content="center"
                key={book.id}
              >
                <Card sx={{ maxWidth: 350 }}>
                  <CardActionArea href={`/book/${book.id}`}>
                    <CardMedia
                      component="img"
                      height="350"
                      image={book.image_url}
                      alt="本の表紙"
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div>書籍は登録されていません</div>
      )}
    </>
  );
};

export default BorrowedBookHitory;
