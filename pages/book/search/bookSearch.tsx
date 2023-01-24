import { useState, useEffect, ChangeEvent } from "react";
import BookIndex from "../../../components/book-index";
import GlobalHeader from "../../../components/globalHeader";
import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, TextField, Container, Button } from "@mui/material";
import { GET_BOOKS } from "../../../query/book/bookGet";
import { GET_USER } from "../../../query/user/userGet";

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
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  // useEffect(() => {
  //   if (books) {
  //     setShowBooks(books);
  //   }
  // }, [books]);

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const result = books.filter((book) => {
      return book.title.match(e.target.value);
    });
    setFilteredBooks(result);
  };

  const { user } = useAuth0();
  const { data: data2 } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });
  const user_info = !data2 ? [] : data2.users_table[0];

  const RegiterButton = () => {
    return (
      <>
        {user_info.type == "Owner" && (
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
        <RegiterButton />
      </div>
    </>
  );
};

export default BookSearch;
