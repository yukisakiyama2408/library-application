import {useState,useEffect} from 'react'
import axios from "axios"
import { gql } from '@apollo/client';
import client from './api/apollo-client';

interface Book{
  id: string; title: string; author:string,image_url:string 
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query{
      books_table{
        id
        title
        author
        image_url
      }
    }
    `,
  });

  return {
    props: {
      books: data.books_table,
    },
 };
}

  

const BookIndex= ({books})=> {
  console.log(books)
  // const [books, setBooks] = useState<Array<Book>>([]);
  // useEffect(() => {
  //   (async()=>{
  //     const { data } = await client.query({
  //       query: gql`
  //       query{
  //         books_table{
  //           id
  //           title
  //           author
  //           image_url
  //         }
  //       }
  //     `,
  //     });
  //    console.log(data.books_table)
  //    console.log(data.data)
  //    console.log(data)
  //   //  console.log(res.data.data)
  //   //  console.log(res.data.data.data)
  //     setBooks(data.data.data.books_table);
  //   });
  // },[])

  // useEffect(() => {
  //   axios
  //   .get('api/hello', {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // data: {},
  //   })
  //   .then((res) => {
  //    console.log(res.data.data.books_table)
  //    console.log(res.data.data)
  //    console.log(res.data.data.data)
  //     setBooks(res.data.data.data.books_table);
  //   });
  // },[])

  return (
    <div>
        {books.map((book:any) => (
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


