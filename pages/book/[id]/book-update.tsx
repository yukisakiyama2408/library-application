import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Container, Grid, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { GET_BOOK_INFO } from "../../../query/book/bookGet";

const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: Int!
    $title: String!
    $author: String!
    $image_url: String!
    $description: String!
    $isbn: String!
    $placed_shelf_id: Int!
  ) {
    update_books(
      where: { id: { _eq: $id } }
      _set: {
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

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  description: string;
  isbn: string;
  placed_shelf_id: number;
}

const BookUpdate = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [placedShelfId, setPlacedShelfId] = useState("");
  const id = router.query.id;
  const { data } = useQuery(GET_BOOK_INFO, {
    variables: { id },
    onCompleted: (data) => {
      setTitle(data.books[0].title);
      setAuthor(data.books[0].author);
      setImage_url(data.books[0].image_url);
      setDescription(data.books[0].description);
      setIsbn(data.books[0].isbn);
      setPlacedShelfId(data.books[0].placed_shelf_id);
    },
  });

  const [updateBook] = useMutation(UPDATE_BOOK);
  const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateBook({
      variables: {
        id: id,
        title: title,
        author: author,
        image_url: image_url,
        description: description,
        isbn: isbn,
        placed_shelf_id: placedShelfId,
      },
    });
    router.push(`/book/${id}`);
  };

  return (
    <div>
      <div>
        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            onSubmit={(e) => handleUpdateBook(e)}
            sx={{ mt: 1 }}
          >
            <h2>Update</h2>
            <Grid container spacing={2}>
              <Grid item xs={30}>
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
            <Button variant="contained" type="submit">
              更新
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default BookUpdate;
