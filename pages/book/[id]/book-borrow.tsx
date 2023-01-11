import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const BORROW_BOOK = gql`
  mutation ($borrowed_book_id: Int!, $borrowing_user_id: Int!) {
    insert_borrowed_books(
      objects: {
        borrowed_book_id: $borrowed_book_id
        borrowing_user_id: $borrowing_user_id
      }
    ) {
      affected_rows
      returning {
        id
        borrowed_book_id
        borrowing_user_id
        date
      }
    }
  }
`;

const GET_USER = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      id
      name
      company
    }
  }
`;

type BookId = {
  id: number;
};

const BookBorrow: React.FC<BookId> = ({ id }) => {
  const { user } = useAuth0();
  console.log(user);
  if (user) {
    console.log(user.sub);
  }

  const { data } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });

  console.log(data);
  const user_info = !data ? [] : data.users_table[0];
  console.log(user_info);

  const [borrowBook] = useMutation(BORROW_BOOK, {
    refetchQueries: ["GetBooks"],
  });
  const handleBorrowBook = () => {
    borrowBook({
      variables: { borrowed_book_id: id, borrowing_user_id: user_info.id },
    });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          借りる
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"この本を借りますか?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              貸出期間は本日より2週間です。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBorrowBook} autoFocus>
              借りる
            </Button>
            <Button onClick={handleClose}>借りない</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default BookBorrow;
