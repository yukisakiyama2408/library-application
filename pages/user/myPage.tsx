import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import BorrowedBook from "./borrowedBook";

const GET_USER = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      id
      name
      company
      borrowed_books {
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
  // console.log(user_info);
  // console.log(user_info && user_info.borrowed_books);
  const borrowedBook_info = user_info.borrowed_books;

  return (
    <>
      <div>{user_info.name}</div>
      {user_info.borrowed_books ? (
        <div>
          <BorrowedBook bookId={borrowedBook_info} />
        </div>
      ) : (
        <div>借りている本はありません</div>
      )}
    </>
  );
};

export default MyPage;
