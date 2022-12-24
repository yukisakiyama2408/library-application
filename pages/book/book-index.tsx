import { gql, useQuery } from "@apollo/client";
import GlobalHeader from "../globalHeader";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Button,
  Grid,
} from "@mui/material";

const GET_BOOKS = gql`
  query GetBooks {
    books_table {
      id
      title
      author
      image_url
    }
  }
`;

interface Book {
  id: string;
  title: string;
  author: string;
  image_url: string;
}

type Props = {
  books_table: Array<Book>;
};

const BookIndex = () => {
  const { data } = useQuery<Props>(GET_BOOKS);
  console.log(data);
  const books = !data ? [] : data.books_table;

  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <Grid container spacing={4} mt={0} px={4}>
        {books.map((book) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            justify-content="center"
            key={book.id}
          >
            <Card sx={{ maxWidth: 350 }}>
              <CardActionArea href={`/book/${book.id}`}>
                <CardMedia
                  component="img"
                  height="500"
                  image={book.image_url}
                  alt="本の表紙"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          // </div>
        ))}
      </Grid>
      {/* <Container maxWidth="sm"> */}
      <div className="index-add-btn">
        <Button variant="contained" href="/book/book-new">
          REGISTER
        </Button>
      </div>
      {/* </Container> */}
    </>
  );
};

export default BookIndex;
