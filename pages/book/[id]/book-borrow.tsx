import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
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

const ADD_BOOK_HISTORY = gql`
  mutation ($borrowed_book_id: Int!, $borrowing_user_id: Int!) {
    insert_borrowed_book_history(
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
        borrowed_date
      }
    }
  }
`;

type BookId = {
  id: number;
  borrowingUser: number;
};

const BookBorrow: React.FC<BookId> = ({ id, borrowingUser }) => {
  const router = useRouter();

  const [borrowBook] = useMutation(BORROW_BOOK);
  const handleBorrowBook = () => {
    borrowBook({
      variables: { borrowed_book_id: id, borrowing_user_id: borrowingUser },
    });
  };

  const [add_book_history] = useMutation(ADD_BOOK_HISTORY);

  const addBookHistory = () => {
    add_book_history({
      variables: { borrowed_book_id: id, borrowing_user_id: borrowingUser },
    });
  };

  const borrowAction = () => {
    handleBorrowBook();
    addBookHistory();
    router.push("/user/myPage");
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
            <Button onClick={borrowAction} autoFocus>
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
