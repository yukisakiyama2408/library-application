import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const BORROW_BOOK = gql`
  mutation ($borrowed_book_id: Int!) {
    insert_borrowed_books(objects: { borrowed_book_id: $borrowed_book_id }) {
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

type BookId = {
  id: number;
};

const BookBorrow: React.FC<BookId> = ({ id }) => {
  const [borrowBook] = useMutation(BORROW_BOOK, {
    refetchQueries: ["GetBooks"],
  });
  const handleBorrowBook = () => {
    borrowBook({
      variables: { borrowed_book_id: id },
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
