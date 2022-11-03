import { gql ,useMutation} from "@apollo/client"
import { useRouter } from "next/router";
import { Button } from "@mui/material";


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

      return<div>
        <div> <Button variant="contained" onClick={handleDeleteBook}>削除</Button></div>
      </div>

}

export default BookDelete