import { gql, useQuery } from "@apollo/client";
import GlobalHeader from "../../components/globalHeader";
import BookBorrow from "../../components/book-borrow";
import { useAuth0 } from "@auth0/auth0-react";
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
      borrowed_books {
        id
      }
    }
  }
`;

const GET_USER = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      id
      name
    }
  }
`;

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  borrowed_books: {
    map(arg0: (borrowed_book: BorrowBook) => number): unknown;
    id: number;
  };
}

type BorrowBook = {
  id: number;
  borrowed_book_id: number;
};
type Props = {
  books: Array<Book>;
};

const BookIndex = () => {
  const { data } = useQuery<Props>(GET_BOOKS);
  const books = !data ? [] : data.books;
  console.log(books);
  const { user } = useAuth0();
  const { data: data2 } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });
  const user_info = !data2 ? [] : data2.users_table[0];
  const borrowingUser = user_info && user_info.id;

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
                      {book.borrowed_books &&
                      Object.keys(book.borrowed_books).length > 0 ? (
                        <div>
                          <Typography variant="body1" gutterBottom>
                            貸出中
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <BookBorrow
                            id={book.id}
                            borrowingUser={borrowingUser}
                          />
                        </div>
                      )}
                    </div>
                  </div>
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
