import {useState,useEffect} from 'react'
import { gql, useQuery} from '@apollo/client';
import {client} from './api/apollo-client';

const GET_BOOKS = gql`
query{
  books_table{
    id
    title
    author
    image_url
  }
}
`
export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_BOOKS,
  });

  return {
    props: {
      books: data.books_table,
        },
 };
}

interface Book{
  id: string; title: string; author:string,image_url:string 
}

type Props = {
  books:Array<Book>
}


const BookIndex:React.FC<Props>= ({books})=> {
  // const {data} = useQuery<Props>(GET_BOOKS)
  

  
  return (
    <div>
        {books.map((book) => (
          <div key={book.id}>
          <p >{book.title}</p>
          <img src={book.image_url}/>
          <p>{book.author}</p>
          </div>
        ))}
    </div>
  )
}

export default BookIndex



