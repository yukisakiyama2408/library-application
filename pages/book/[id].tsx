import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import BookDelete from "../../components/book-delete";
import BookBorrow from "../../components/book-borrow";
import GlobalHeader from "../../components/globalHeader";
import { GET_BOOK_INFO } from "../../query/book/bookGet";
import { GET_USER } from "../../query/user/userGet";
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  description: string;
  borrowed_books: {
    map: any;
    id: number;
  };
}

type BorrowBook = {
  id: number;
  borrowed_book_id: number;
};

const BookDetail = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data } = useQuery(GET_BOOK_INFO, {
    variables: { id },
  });
  const book: Book = !data ? [] : data.books[0];
  const borrowBook =
    book.borrowed_books &&
    book.borrowed_books.map((borrowed_book: BorrowBook) => borrowed_book.id);

  const { user } = useAuth0();
  const { data: data2 } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });
  const user_info = !data2 ? [] : data2.users_table[0];
  const borrowingUser = user_info && user_info.id;

  const EditButton = () => {
    return (
      <>
        {user_info.type == "Owner" && (
          <>
            <div className="editBtn">
              <Button variant="contained">
                <Link
                  href="/book/[id]/book-update"
                  as={`/book/${book.id}/book-update`}
                >
                  Update
                </Link>
              </Button>
            </div>
            <div className="editBtn">
              <BookDelete id={book.id} />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <div>
        <GlobalHeader />
      </div>
      <Container component="main" maxWidth="md">
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableBody>
            <TableRow
              key={book.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" className="book-table">
                <div className="detail-book-img">
                  <img
                    src={book.image_url}
                    alt="本の表紙"
                    className="detail-book-img"
                  />
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="detail-book-infos">
                  <div className="detail-book-info">
                    <Typography gutterBottom variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      著者: {book.author}
                    </Typography>
                    <div>
                      {borrowBook && borrowBook.length > 0 ? (
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                        >
                          貸出状況： 貸出中
                        </Typography>
                      ) : (
                        <div>
                          <BookBorrow
                            id={book.id}
                            borrowingUser={borrowingUser}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <EditButton />
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
      <Container component="main" maxWidth="md">
        <div>
          <Typography gutterBottom variant="body1" component="div">
            書籍説明：
          </Typography>
        </div>
        <div>
          <Typography gutterBottom variant="body2" component="div">
            {book.description}
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default BookDetail;
