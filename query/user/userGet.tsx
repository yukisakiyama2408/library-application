import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      id
      name
      email
      type
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
