import { gql ,useMutation} from "@apollo/client"
import { useRouter } from "next/router";
import { useState } from "react";
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from "@mui/material";

const DELETE_BOOK = gql `
mutation deleteBook($id:Int!) {
    delete_books_table(where: {id: {_eq:$id}}){
        affected_rows
    }
}
`;

type Id={
    id:number
}

const BookDelete:React.FC<Id> =({id})=>{
    const router = useRouter()
    const [deleteBook] = useMutation(DELETE_BOOK,{
        refetchQueries: ['GetBooks'],
    });
    // const id = router.query.id
    console.log(id)
    const handleDeleteBook =() => {
        deleteBook({
          variables:{ id: id},
        })
        router.push("/book/book-index")
      }

      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };    

      return(
      <div>
        <div>
          <Button variant="contained" onClick={handleClickOpen}>
            削除
          </Button>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"本当に削除しますか?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            「削除する」を押すとこの書籍情報は削除されます。削除後は情報を復元することができないため、ご注意ください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteBook} autoFocus>
            削除する
          </Button>
          <Button onClick={handleClose}>削除しない</Button>
        </DialogActions>
      </Dialog>
        </div>
        {/* <div> <Button variant="contained" onClick={handleDeleteBook}>削除</Button></div> */}
      </div>
      )
}

export default BookDelete