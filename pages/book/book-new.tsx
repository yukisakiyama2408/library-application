import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Box, TextField, Container, Grid, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ADD_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $image_url: String!
    $description: String!
    $isbn: String!
    $placed_shelf_id: Int!
  ) {
    insert_books(
      objects: {
        title: $title
        author: $author
        image_url: $image_url
        description: $description
        isbn: $isbn
        placed_shelf_id: $placed_shelf_id
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
        placed_shelf_id
      }
    }
  }
`;

interface ISBN {
  [key: string]: string;
  type: string;
  identifier: string;
}

interface BookItem {
  title: string;
  author: string;
  image: string;
  description: string;
  isbn: Array<ISBN>;
  placed_shelf_id: number;
}

interface Props {
  item: BookItem;
}

const BookInput: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [placedShelfId, setPlacedShelfId] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setAuthor(item.author);
      setImage_url(item.image);
      setDescription(item.description);
      setIsbn(item.isbn[1].identifier);
    }
  }, [item]);

  const [addBook] = useMutation(ADD_BOOK);

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addBook({
      variables: {
        title: title,
        author: author,
        image_url: image_url,
        description: description,
        isbn: isbn,
        placed_shelf_id: placedShelfId,
      },
    });
    router.push("/");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
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
            <Grid item xs={30}>
              <InputLabel>本棚</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={placedShelfId}
                onChange={(e) => setPlacedShelfId(e.target.value)}
                label="棚のID"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>イベントスペース</MenuItem>
                <MenuItem value={2}>Social Lounge</MenuItem>
              </Select>
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
