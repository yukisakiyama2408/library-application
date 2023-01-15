import React, { useEffect, useState } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Box, TextField, Container, Grid, Button } from "@mui/material";

const ADD_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $image_url: String!
    $description: String!
    $isbn: String!
  ) {
    insert_books(
      objects: {
        title: $title
        author: $author
        image_url: $image_url
        description: $description
        isbn: $isbn
      }
    ) {
      affected_rows
      returning {
        id
        title
        author
        image_url
        description
        isbn
      }
    }
  }
`;

interface Item {
  items: {
    title: string;
    author: string;
    image: string;
    description: string;
    isbn: string;
  };
}

const BookInput = (items: Item) => {
  const router = useRouter();
  console.log(items);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");

  const ISBN = items.items && items.items.isbn;

  const handleApibook = () => {
    setTitle(items.items.title);
    setAuthor(items.items.author);
    setImage_url(items.items.image);
    setDescription(items.items.description);
    setIsbn(ISBN[1].identifier);
  };

  // console.log(items.items.isbn[1]);

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      setTitle(" "), setAuthor(" "), setImage_url(" ");
      setDescription(" ");
      setIsbn("");
    },
  });

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addBook({
      variables: {
        title: title,
        author: author,
        image_url: image_url,
        description: description,
        isbn: isbn,
      },
    });
    router.push("/book/book-index");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div>
          <Button variant="contained" href="/book/book-index">
            Back to Home
          </Button>
        </div>
        <div>
          <Button variant="contained" onClick={handleApibook}>
            追加{" "}
          </Button>
        </div>
        <Box component="form" onSubmit={(e) => handleAddBook(e)} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="title"
                placeholder="本のタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                placeholder="著者"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="image_url"
                placeholder="画像URL"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="description"
                placeholder="詳細"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Grid>
          </Grid>
          <div className="register-button">
            <Button variant="contained" type="submit">
              登録
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default BookInput;
