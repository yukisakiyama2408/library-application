import { gql, useQuery} from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BookDelete from './[id]/book-delete';

const GET_BOOK = gql`
query getBook($id:Int!) {
    books_table(where:{id:{_eq:$id}}){
      id
      title
      author
      image_url
      description
    }
  }
`

interface Book{
    id: number; title: string; author:string,image_url:string,description:string
  }

const BookDetail =()=>{
    const router = useRouter();
    const id = router.query.id
    // console.log(id)
    const {data} = useQuery(GET_BOOK,{
        variables:{id}
    })
    console.log(data)
    const book:Book= !data? []:data.books_table[0]
     console.log(book)
    // const {title,author,image_url}=router.query
    // console.log(router.query)

    return( 
    <div>
       <div>
        <Link href="/book/book-index" as={"/book/book-index"} >
        Back to Home
      </Link>
      </div>
      <div>
        <h2> {book.title}</h2>
        <img src={book.image_url}/>
        <p>{book.author}</p>
        <p>{book.description}</p>
      </div>
      <div>
        <Link href="/book/[id]/book-update" as={`/book/${book.id}/book-update`} >
        Update
      </Link>
      <div><BookDelete id={book.id}/></div>
      </div>
      
    </div>)
}

export default BookDetail