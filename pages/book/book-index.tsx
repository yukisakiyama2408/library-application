import { gql, useQuery } from "@apollo/client";
import GlobalHeader from "../../components/globalHeader";
import BookBorrow from "../../components/book-borrow";
import {
  Typography,
  Button,
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
                  <div className="index-book-img">
                    <img src={book.image_url} className="index-book-cover" />
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="index-book-infos">
                    <div className="index-book-info">
                      <Link href={`/book/${book.id}`} variant="h6">
                        {book.title}
                      </Link>
                      <Typography variant="body2" color="text.secondary">
                        {book.author}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell align="right">
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </TableCell> */}
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
