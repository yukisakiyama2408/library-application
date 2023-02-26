import { useState, ChangeEvent } from "react";
import { BookIndex } from "../../../components/book/book-index";
import GlobalHeader from "../../../components/globalHeader";
import { useQuery } from "@apollo/client";
import Link from "next/link";
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
  const { data } = useQuery<Props>(GET_BOOKS, {
    onError: (...args) => {
      console.log(args);
    },
  });
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
          <div className="index-menu">
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                type="text"
                placeholder="検索"
                onChange={(e) => handleSearch(e)}
              />
            </Box>
          </div>
          <div className="index-menu">
            <Button variant="text">
              <Link href="/book/shelfBook">本棚から探す</Link>
            </Button>
          </div>
          <div className="index-menu">
            <Button variant="text">
              <Link href="/book/monthlyAddBook">最新刊を確認</Link>
            </Button>
          </div>
        </Container>
        <div>
          <BookIndex books={filteredBooks.length ? filteredBooks : books} />
        </div>
      </div>
    </>
  );
};

export default BookSearch;
