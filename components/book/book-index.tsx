import { useQuery } from "@apollo/client";
import BookBorrow from "./book-borrow";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_USER } from "../../query/user/userGet";
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

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  borrowed_books: {
    id: number;
  };
}

interface BookProps {
  books: Array<Book>;
}

export interface User {
  id: number;
  type: string;
}

export const BookIndex: React.FC<BookProps> = (books) => {
  const [userId, setUserId] = useState(0);
  const [userType, setUserType] = useState("");
  const { user } = useAuth0();
  const { data } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
    onCompleted: (data) => {
      setUserId(data.users_table[0].id);
      setUserType(data.users_table[0].type);
    },
  });

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

  const RegiterButton = () => {
    return (
      <>
        {userType && userType == "Owner" && (
          <div className="index-add-btn">
            <Button variant="contained" href="/book/search/book-google-search">
              REGISTER
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
                    <img
                      src={book.image_url}
                      alt="本の表紙"
                      className="index-book-cover"
                    />
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
                          <BookBorrow id={book.id} borrowingUser={userId} />
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
      <div>
        <RegiterButton />
      </div>
    </>
  );
};
