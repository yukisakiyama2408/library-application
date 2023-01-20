import React, { useEffect, useState } from "react";
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

interface ISBN {
  [key: string]: string;
  type: string;
  identifier: string;
}

interface Items {
  items: {
    title: string;
    author: string;
    image: string;
    description: string;
    isbn: Array<ISBN>;
  };
}

const BookInput: React.FC<Items> = (items) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");

  const ISBN = items.items && items.items.isbn;

  useEffect(() => {
    setTitle(items.items.title);
    setAuthor(items.items.author);
    setImage_url(items.items.image);
    setDescription(items.items.description);
    setIsbn(ISBN && ISBN[1].identifier);
  }, [items]);

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
    router.push("/");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div>
          <Button variant="contained" href="/book/book-index">
            Back to Home
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
