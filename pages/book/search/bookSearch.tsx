import { useState, useEffect, ChangeEvent } from "react";
import BookIndex from "../book-index";
import GlobalHeader from "../../../components/globalHeader";
import { gql, useQuery } from "@apollo/client";
import { Box, TextField, Container } from "@mui/material";

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

  const [showBooks, setShowBooks] = useState<Book[]>(books && books);
  useEffect(() => {
    setShowBooks(books);
  }, []);
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
        <div>
          <BookIndex books={showBooks} />
        </div>
      </div>
    </>
  );
};

export default BookSearch;
