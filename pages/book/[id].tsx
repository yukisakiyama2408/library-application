import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import BookDelete from "./[id]/book-delete";
import BookBorrow from "../../components/book-borrow";
import GlobalHeader from "../../components/globalHeader";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
} from "@mui/material";

const GET_BOOK = gql`
  query getBook($id: Int!) {
    books(where: { id: { _eq: $id } }) {
      id
      title
      author
      image_url
      description
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
  const { data } = useQuery(GET_BOOK, {
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

  return (
    <div>
      <div>
        <GlobalHeader />
      </div>
      <Container>
        <div className="image-section">
          <Card sx={{ maxWidth: 450 }}>
            <CardMedia
              component="img"
              height="400"
              image={book.image_url}
              alt="本の表紙"
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            />
          </Card>
        </div>
        <div className="info-section">
          <h2> {book.title}</h2>
          <p>{book.author}</p>
        </div>
        <p>{book.description}</p>
      </Container>
      <div>
        <div>
          <Button variant="contained">
            <Link
              href="/book/[id]/book-update"
              as={`/book/${book.id}/book-update`}
            >
              Update
            </Link>
          </Button>
        </div>
        <div>
          <BookDelete id={book.id} />
        </div>
        {borrowBook && borrowBook.length > 0 ? (
          <div>貸出中</div>
        ) : (
          <div>
            <BookBorrow id={book.id} borrowingUser={borrowingUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
