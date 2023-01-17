import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import BorrowedBook from "./borrowedBook";
import BorrowedBookHitory from "./borrowedBookHistory";
import GlobalHeader from "../globalHeader";
import { Typography, Divider, Container } from "@mui/material";

const GET_USER = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      id
      name
      borrowed_books {
        id
        borrowed_book_id
      }
      borrowed_book_history {
        id
        borrowed_book_id
      }
    }
  }
`;

const MyPage = () => {
  const { user } = useAuth0();
  const { data } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });

  const user_info = !data ? [] : data.users_table[0];
  const borrowedBook_info = user_info.borrowed_books;
  const borrowedBookHistory_info = user_info.borrowed_book_history;
  console.log(borrowedBook_info);
  console.log(borrowedBookHistory_info);

  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <Container>
        <Typography gutterBottom variant="h5" component="div">
          {user_info.name}さんのホーム
        </Typography>
        <div>
          <div>
            <Typography gutterBottom variant="h6" component="div">
              現在借りている本
            </Typography>
            <Divider />

            <BorrowedBook bookId={borrowedBook_info} />
          </div>
          <div>
            <Typography gutterBottom variant="h6" component="div">
              過去に読んだ本
            </Typography>
            <Divider />
            <BorrowedBookHitory bookId={borrowedBookHistory_info} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyPage;
