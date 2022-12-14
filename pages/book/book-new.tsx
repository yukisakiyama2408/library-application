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
  ) {
    insert_books(
      objects: {
        title: $title
        author: $author
        image_url: $image_url
        description: $description
      }
    ) {
      affected_rows
      returning {
        id
        title
        author
        image_url
        description
      }
    }
  }
`;

interface Item {
  items: { title: string; author: string; image: string; description: string };
}

const BookInput = (items: Item) => {
  const router = useRouter();
  console.log(items);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");

  const handleApibook = () => {
    setTitle(items.items.title);
    setAuthor(items.items.author);
    setImage_url(items.items.image);
    setDescription(items.items.description);
  };

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      setTitle(" "), setAuthor(" "), setImage_url(" ");
      setDescription(" ");
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
      },
      // refetchQueries: [{ query: GET_BOOKS }]
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
            ??????{" "}
          </Button>
        </div>
        <Box component="form" onSubmit={(e) => handleAddBook(e)} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="title"
                placeholder="??????????????????"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                placeholder="??????"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="image_url"
                placeholder="??????URL"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="description"
                placeholder="??????"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <div className="register-button">
            <Button variant="contained" type="submit">
              ??????
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default BookInput;
