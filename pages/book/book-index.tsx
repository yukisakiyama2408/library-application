import { gql, useQuery} from '@apollo/client';
import Link from 'next/link';


const GET_BOOKS = gql`
query GetBooks {
  books_table{
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

type Props = {
  books_table: Array<Book>
}


const BookIndex= ()=> {
  const {data} = useQuery<Props>(GET_BOOKS)
  console.log(data)
  const books= !data? []:data.books_table
  

  
  return (
    <div>
      <div>
      <div>
        <Link href="/book/book-new" as={"/book/book-new"} >
        <a>Register</a>
      </Link>
      </div>
    {books.map((book) => (
      <div key={book.id}>
      <p >{book.title}</p>
      <img src={book.image_url}/>
      <p>{book.author}</p>
      <Link href="/book/[id]" as={`/book/${book.id}`} >
        <a>詳細</a>
      </Link>
      </div>
    ))}
</div></div>
    
  )
}

export default BookIndex



