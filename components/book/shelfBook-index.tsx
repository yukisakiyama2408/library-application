import { gql, useQuery } from "@apollo/client";
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

export const GET_SHELF_BOOKS = gql`
  query GetShelfBooks($placed_shelf_id: Int!) {
    books(where: { placed_shelf_id: { _eq: $placed_shelf_id } }) {
      id
      title
      author
      image_url
      description
      isbn
      borrowed_books {
        id
      }
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

interface BookProps {
  books: Array<Book>;
}

export interface PropsShelf {
  shelfId: string;
}

export interface User {
  id: number;
  type: string;
}

export const BookShelfIndex: React.FC<PropsShelf> = ({ shelfId }) => {
  console.log(shelfId);
  const { data, loading } = useQuery(GET_SHELF_BOOKS, {
    variables: { placed_shelf_id: shelfId },
  });
  const books = !data ? [] : data.books;
  console.log(books);
  const [userId, setUserId] = useState(0);
  const { user } = useAuth0();
  const { data: data2 } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
    onCompleted: (data) => {
      setUserId(data.users_table[0].id);
    },
  });

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
        {loadIndex > 10 && loadIndex < books.length && (
          <div>
            <Button onClick={displayLess} variant="contained">
              縮める
            </Button>
            <Button onClick={displayMore} variant="contained">
              もっと表示する
            </Button>
          </div>
        )}
        {loadIndex > books.length && (
          <div>
            <Button onClick={displayLess} variant="contained">
              縮める
            </Button>
          </div>
        )}
      </>
    );
  };
  if (loading) {
    <div>Loading...</div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableBody>
            {books.slice(0, loadIndex).map((book: Book) => (
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
    </>
  );
};
