import { gql, useQuery } from "@apollo/client";
import GlobalHeader from "../../components/globalHeader";
import BookBorrow from "../../components/book-borrow";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Link,
} from "@mui/material";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      image_url
    }
  }
`;

interface Book {
  id: string;
  title: string;
  author: string;
  image_url: string;
}

type Props = {
  books: Array<Book>;
};

const BookIndex = () => {
  const { data } = useQuery<Props>(GET_BOOKS);
  const books = !data ? [] : data.books;

  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={book.image_url}
                      alt="本の表紙"
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                  </Card>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link href={`/book/${book.id}`} variant="h6">
                    {book.title}
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="index-add-btn">
        <Button variant="contained" href="/book/search/book-search">
          REGISTER
        </Button>
      </div>
    </>
  );
};

export default BookIndex;
