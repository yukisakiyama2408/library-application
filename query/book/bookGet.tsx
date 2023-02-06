import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      image_url
      borrowed_books {
        id
      }
    }
  }
`;

export const GET_BOOK_INFO = gql`
  query GetBooks($id: Int!) {
    books(where: { id: { _eq: $id } }) {
      id
      title
      author
      image_url
      description
      isbn
      borrowed_books {
        id
        borrowed_book_id
      }
      book_shelf {
        shelfname
      }
    }
  }
`;

export const GET_BORROWED_BOOK_INFO = gql`
  query getBorrowedBook($id: [Int!]) {
    borrowed_books(where: { borrowing_user_id: { _in: $id } }) {
      date
      book {
        id
        title
        author
        image_url
        description
      }
    }
  }
`;

export const GET_BORROWED_BOOK_HISTORY = gql`
  query getBorrowedBookHistory($id: [Int!]) {
    books(where: { id: { _in: $id } }) {
      id
      title
      author
      image_url
      description
    }
  }
`;
