import {useState,useEffect} from 'react'
import axios from "axios"

// interface Books{
//    index: { id: string; title: string; author:string,image_url:string }[]
// }
interface Book{
      id: string; title: string; author:string,image_url:string 
  }
  

const BookIndex = ()=> {
  const [books, setBooks] = useState<Array<Book>>([]);
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

  useEffect(() => {
    axios
    .get('api/hello', {
      headers: {
        "Content-Type": "application/json",
      },
      // data: {},
    })
    .then((res) => {
     console.log(res.data.data.books_table)
     console.log(res.data.data)
     console.log(res.data.data.data)
      setBooks(res.data.data.data.books_table);
    });
  },[])

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


