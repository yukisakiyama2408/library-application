import { gql, useQuery } from "@apollo/client";
import GlobalHeader from "../../components/globalHeader";
import { Props } from "./search/bookSearch";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export const GET_MONTH_BOOK = gql`
  query GetMonthBooks {
    books(where: { add_date: { _eq: "2023-02-05" } }) {
      id
      title
      author
      image_url
      description
      isbn
    }
  }
`;

const MonthAddBook = () => {
  const { data, loading } = useQuery<Props>(GET_MONTH_BOOK);
  const books = !data ? [] : data.books;
  console.log(books);
  if (loading) {
    return (
      <>
        <div className="loadingCircle">
          <CircularProgress />
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <div>
        <Container component="main">
          <Typography variant="h4" gutterBottom>
            2月の新作
          </Typography>
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
                <Card sx={{ maxWidth: 250 }}>
                  <CardActionArea href={`/book/${book.id}`}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={book.image_url}
                      alt="本の表紙"
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default MonthAddBook;
