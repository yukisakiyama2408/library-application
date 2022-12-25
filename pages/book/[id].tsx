import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import BookDelete from "./[id]/book-delete";
import { Container, Typography, Button, Box } from "@mui/material";

const GET_BOOK = gql`
  query getBook($id: Int!) {
    books(where: { id: { _eq: $id } }) {
      id
      title
      author
      image_url
      description
    }
  }
`;

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  description: string;
}

const BookDetail = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data } = useQuery(GET_BOOK, {
    variables: { id },
  });
  console.log(data);
  const book: Book = !data ? [] : data.books_table[0];
  console.log(book);

  return (
    <div>
      <div>
        <Button variant="contained" href="/book/book-index">
          Back to Home
        </Button>
      </div>
      <Container>
        <div className="image-section">
          <img src={book.image_url} alt="book cover image" />
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
      </div>
    </div>
  );
};

export default BookDetail;
