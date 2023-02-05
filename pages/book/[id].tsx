import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import BookDelete from "../../components/book/book-delete";
import BookBorrow from "../../components/book/book-borrow";
import GlobalHeader from "../../components/globalHeader";
import { GET_BOOK_INFO } from "../../query/book/bookGet";
import { GET_USER } from "../../query/user/userGet";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
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

interface UserProps {
  userId: number;
  userType: String;
}

const BookDetail = () => {
  const router = useRouter();
  const id = router.query.id;
  const [bookId, setBookId] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");

  const { data, loading } = useQuery(GET_BOOK_INFO, {
    variables: { id: id },
    onError: (...args) => {
      console.log(args);
    },
    onCompleted: (data) => {
      setBookId(data.books[0].id);
      setTitle(data.books[0].title);
      setAuthor(data.books[0].author);
      setImage_url(data.books[0].image_url);
      setDescription(data.books[0].description);
    },
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

  if (loading) {
    return (
      <>
        <div className="loadingCircle">
          <CircularProgress />
        </div>
      </>
    );
  }

  const EditButton = () => {
    return (
      <>
        {user_info && user_info.type == "Owner" && (
          <>
            <div className="editBtn">
              <Button variant="contained">
                <Link
                  href="/book/[id]/book-update"
                  as={`/book/${bookId}/book-update`}
                >
                  Update
                </Link>
              </Button>
            </div>
            {bookId && (
              <div className="editBtn">
                <BookDelete id={bookId} />
              </div>
            )}
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
              key={bookId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" className="book-table">
                <div className="detail-book-img">
                  <img
                    src={image_url}
                    alt="本の表紙"
                    className="detail-book-img"
                  />
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="detail-book-infos">
                  <div className="detail-book-info">
                    <Typography gutterBottom variant="h6" component="div">
                      {title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      著者: {author}
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
            {description}
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default BookDetail;
