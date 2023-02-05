import { useState, useEffect, ChangeEvent } from "react";
import { BookIndex } from "../../../components/book/book-index";
import GlobalHeader from "../../../components/globalHeader";
import { useQuery } from "@apollo/client";
import { Box, TextField, Container, Button } from "@mui/material";
import { GET_BOOKS } from "../../../query/book/bookGet";

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  borrowed_books: {
    id: number;
  };
}

export type Props = {
  books: Array<Book>;
};

const BookSearch = () => {
  const { data } = useQuery<Props>(GET_BOOKS);
  const books = !data ? [] : data.books;
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const result = books.filter((book) => {
      return book.title.match(e.target.value);
    });
    setFilteredBooks(result);
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
          <BookIndex books={filteredBooks.length ? filteredBooks : books} />
        </div>
      </div>
    </>
  );
};

export default BookSearch;
