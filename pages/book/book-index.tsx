import { gql, useQuery} from '@apollo/client';
import {client} from '../api/apollo-client';
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

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: GET_BOOKS,
//   });

//   return {
//     props: {
//       books: data.books_table,
//         },
//  };
// }

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
        {books.map((book) => (
          <div key={book.id}>
          <p >{book.title}</p>
          <img src={book.image_url}/>
          <p>{book.author}</p>
          <Link href="/book/$[book.id]" as={`/${book.id}`} >
            <a>詳細</a>
          </Link>
          </div>
        ))}
    </div>
  )
}

export default BookIndex



