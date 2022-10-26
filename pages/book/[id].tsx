import { gql, useQuery} from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GET_BOOK = gql`
query getBook($id:Int!) {
    books_table(where:{id:{_eq:$id}}){
      id
      title
      author
      image_url
    }
  }
`

interface Book{
    id: string; title: string; author:string,image_url:string 
  }
  
  type Books = {
    books_table: Array<Book>
  }

const BookEdit =()=>{
    const router = useRouter();
    const id = router.query.id
    // console.log(id)
    const {data} = useQuery<Books>(GET_BOOK,{
        variables:{id}
    })
    // console.log(data)
    const book= !data? []:data.books_table[0]
     console.log(book)
    // const {title,author,image_url}=router.query
    // console.log(router.query)
    return( 
    <div>
       <div>
        <Link href="/book/book-index" as={"/book/book-index"} >
        <a>Back to Home</a>
      </Link>
      </div>
      <div>
        <h2> {book.title}</h2>
        <img src={book.image_url}/>
        <p>{book.author}</p>
      </div>
    </div>)
}

export default BookEdit