import {useState,useEffect} from 'react'
import axios from "axios"

type Books={
    id:number,
    title:string,
    author: string,
    image_url:string
}

const BookIndex = ()=> {
  const [books, setBooks] = useState<Array<any>>([])
  useEffect(() => {
    axios
    .get('api/hello', {
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    })
    .then((res) => {
     console.log(res.data)
      setBooks(res.data.books_table);
    });
  },[])

  return (
    <div>
        {books.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
    </div>
  )
}

export default BookIndex


