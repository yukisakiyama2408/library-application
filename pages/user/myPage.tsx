import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import BorrowedBook from "./borrowedBook";
import BorrowedBookHitory from "./borrowedBookHistory";

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
  console.log(user_info);
  const borrowBook =
    user_info.borrowed_books &&
    user_info.borrowed_books.map((borrowed_book: any) => borrowed_book.id);
  const borrowedBook_info = user_info.borrowed_books;

  return (
    <>
      <div>{user_info.name}</div>
      <div>
        <div>
          <div>現在借りている本</div>
          <BorrowedBook bookId={borrowedBook_info} />
        </div>
        <div>
          <div>過去に読んだ本</div>
          <BorrowedBookHitory bookId={borrowedBook_info} />
        </div>
      </div>
    </>
  );
};

export default MyPage;
