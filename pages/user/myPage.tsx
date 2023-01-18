import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import BorrowedBook from "../../components/borrowedBook";
import BorrowedBookHitory from "../../components/borrowedBookHistory";
import GlobalHeader from "../../components/globalHeader";
import { Typography, Divider, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

const GET_USER = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      id
      name
      borrowed_books {
        id
        borrowed_book_id
        borrowing_user_id
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

  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <Container>
        <div>
          {" "}
          <Typography gutterBottom variant="h5" component="div">
            {user_info.name}さんのホーム
          </Typography>
          <Link href="/user/profileEdit">
            {" "}
            <EditIcon />
          </Link>
        </div>

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
