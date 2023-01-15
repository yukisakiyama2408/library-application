import { gql, useQuery } from "@apollo/client";
import ReturnBook from "./returnBook";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { formatInTimeZone } from "date-fns-tz";
const GET_BORROWED_BOOK = gql`
  query getBorrowedBook($id: [Int!]) {
    books(where: { id: { _in: $id } }) {
      id
      title
      author
      image_url
      description
      borrowed_books {
        date
      }
    }
  }
`;

interface Book {
  id: string;
  title: string;
  author: string;
  image_url: string;
  description: string;
  borrowed_books: {
    map: any;
    date: string;
  };
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

const BorrowedBook: React.FC<BookIds> = ({ bookId }) => {
  const borrowedBookIds =
    bookId && bookId.map((bookid) => bookid.borrowed_book_id);
  const { data } = useQuery<Props>(GET_BORROWED_BOOK, {
    variables: { id: borrowedBookIds },
  });

  const books = !data ? [] : data.books;
  console.log(books);
  const book_infos = books && books.map((book) => book.borrowed_books);
  console.log(book_infos);
  const book_dates =
    book_infos && book_infos.map((book_info) => book_info.date);
  console.log(book_dates);

  return (
    <>
      {borrowedBookIds && borrowedBookIds.length > 0 ? (
        <Grid container spacing={4} mt={0} px={4}>
          {books.map((book) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              justify-content="center"
              key={book.id}
            >
              <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                  component="img"
                  height="500"
                  image={book.image_url}
                  alt="本の表紙"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    返却期限：
                    {formatInTimeZone(
                      new Date(
                        book.borrowed_books.map(
                          (item: { date: Date }) => item.date
                        )
                      ),
                      "JST",
                      "yyyy年MM月dd日"
                    )}
                  </Typography>
                </CardContent>
                <div>
                  <ReturnBook bookId={book.id} />
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
