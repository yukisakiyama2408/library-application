import { useState, useEffect, ChangeEvent } from "react";
import BookIndex from "../../../components/book-index";
import GlobalHeader from "../../../components/globalHeader";
import { gql, useQuery } from "@apollo/client";
import { Box, TextField, Container, Button } from "@mui/material";

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

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  borrowed_books: {
    id: number;
  };
}

type Props = {
  books: Array<Book>;
};

const BookSearch = () => {
  const { data } = useQuery<Props>(GET_BOOKS);
  const books = !data ? [] : data.books;

  const [showBooks, setShowBooks] = useState<Book[]>([]);
  useEffect(() => {
    setShowBooks(books);
  }, [books]);
  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const result = books.filter((book) => {
      return book.title.match(e.target.value);
    });
    setShowBooks(result);
  };

  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <div>
        <Container component="main" maxWidth="xs">
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              type="text"
              placeholder="検索"
              onChange={(e) => handleSearch(e)}
            />
          </Box>
        </Container>
        <div>{books && <BookIndex books={showBooks} />}</div>
        <div className="index-add-btn">
          <Button variant="contained" href="/book/search/book-google-search">
            REGISTER
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookSearch;
