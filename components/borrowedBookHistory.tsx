import { useQuery } from "@apollo/client";
import { GET_BORROWED_BOOK_HISTORY } from "../query/book/bookGet";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

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

  const books = !data ? [] : data.books;

  return (
    <>
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
              <CardActionArea href={`/book/${book.id}`}>
                <CardMedia
                  component="img"
                  height="400"
                  image={book.image_url}
                  alt="本の表紙"
                  sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BorrowedBookHitory;
