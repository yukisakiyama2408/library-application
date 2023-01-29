import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const RETURN_BOOK = gql`
  mutation returnBook($borrowed_book_id: Int!) {
    delete_borrowed_books(
      where: { borrowed_book_id: { _eq: $borrowed_book_id } }
    ) {
      affected_rows
    }
  }
`;

interface BookId {
  bookId: string;
}

const ReturnBook: React.FC<BookId> = ({ bookId }) => {
  const router = useRouter();
  const [returnBook] = useMutation(RETURN_BOOK, {
    refetchQueries: ["getBorrowedBook"],
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReturnBook = () => {
    returnBook({
      variables: { borrowed_book_id: bookId },
    });
    router.push("/user/myPage");
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          返却する
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"本当に返却しますか?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              本棚に綺麗に収納されていますか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReturnBook} autoFocus>
              返却する
            </Button>
            <Button onClick={handleClose}>返却しない</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <div> <Button variant="contained" onClick={handleDeleteBook}>削除</Button></div> */}
    </div>
  );
};

export default ReturnBook;
