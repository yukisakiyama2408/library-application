import { gql, useQuery } from "@apollo/client";
import BookBorrow from "./book-borrow";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Link,
  Button,
} from "@mui/material";

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
    id: number;
  };
}

type BookProps = {
  books: Array<Book>;
};

const BookIndex: React.FC<BookProps> = (books) => {
  const { user } = useAuth0();
  const { data: data2 } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });
  const user_info = !data2 ? [] : data2.users_table[0];
  const borrowingUser = user_info && user_info.id;
  const Books = books && books.books;

  const [loadIndex, setLoadIndex] = useState(10);
  const displayMore = () => {
    setLoadIndex(loadIndex + 10);
  };

  const displayLess = () => {
    setLoadIndex(loadIndex - 10);
  };

  const DisplayButton = () => {
    return (
      <>
        {loadIndex < 11 && (
          <div>
            <Button onClick={displayMore} variant="contained">
              もっと表示する
            </Button>
          </div>
        )}
        {loadIndex > 10 && loadIndex < Books.length && (
          <div>
            <Button onClick={displayLess} variant="contained">
              縮める
            </Button>
            <Button onClick={displayMore} variant="contained">
              もっと表示する
            </Button>
          </div>
        )}
        {loadIndex > Books.length && (
          <div>
            <Button onClick={displayLess} variant="contained">
              縮める
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableBody>
            {Books.slice(0, loadIndex).map((book: Book) => (
              <TableRow
                key={book.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="book-table">
                  <div className="index-book-img">
                    <img src={book.image_url} className="index-book-cover" />
                  </div>
                </TableCell>
                <TableCell align="left">
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
      <div>
        <DisplayButton />
      </div>
    </>
  );
};

export default BookIndex;
