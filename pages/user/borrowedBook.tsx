import { gql, useQuery } from "@apollo/client";
import ReturnBook from "./returnBook";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Button,
  Grid,
} from "@mui/material";

const GET_BORROWED_BOOK = gql`
  query getBorrowedBook($id: [Int!]) {
    books(where: { id: { _in: $id } }) {
      id
      title
      author
      image_url
      description
    }
  }
`;

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

const BorrowedBook: React.FC<BookIds> = ({ bookId }) => {
  //   console.log(bookId);
  const borrowedBookIds = bookId.map((bookid) => bookid.borrowed_book_id);
  console.log(borrowedBookIds);
  const { data } = useQuery<Props>(GET_BORROWED_BOOK, {
    variables: { id: borrowedBookIds },
  });
  console.log(data);

  const books = !data ? [] : data.books;

  return (
    <>
      <div>aa</div>
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
                </CardContent>
              </CardActionArea>
              <div>
                <ReturnBook bookId={book.id} />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BorrowedBook;
