import React,{useState} from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const ADD_BOOK = gql `
mutation ($title: String!, $author: String!,$image_url: String!) {
    insert_books_table(objects: {title: $title, author: $author,image_url:$image_url}) {
      affected_rows
      returning {
        id
        title
        author
        image_url
      }
    }
  }
`;

const BookInput = () => {
  const router = useRouter()
    const [title, setTitle] = useState('');
    const [author,setAuthor] = useState("")
    const [image_url,setImage_url] = useState("")

    const [addBook] = useMutation(ADD_BOOK,
      {
        onCompleted:()=>{
          setTitle(" "),
          setAuthor(" "),
          setImage_url(" ")
        }
      });

    const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {  
      e.preventDefault()
      await addBook({
        variables: { title: title, author:author,image_url:image_url},
        // refetchQueries: [{ query: GET_BOOKS }]
      })
      router.push("/book/book-index")
    }

    return (
      <div>
         <div>
        <Link href="/book/book-index" as={"/book/book-index"} >
        <a>Back to Home</a>
      </Link>
      </div>
      <div>
        <form onSubmit={e => handleAddBook(e)}>
          <input
          type="text"
          name="title"
          placeholder="本のタイトル"
          value={title}
          onChange={e => (setTitle(e.target.value))}
          />
       <input
       type="text"
       placeholder="著者"
       value={author}
       onChange={e => (setAuthor(e.target.value))}
      />
       <input
       type="text"
       name="image_url"
       placeholder="画像URL"
       value={image_url}
       onChange={e => (setImage_url(e.target.value))}
      />
      <button type="submit">登録</button>
      </form>
      </div>
      </div>
     
    );
    }
  
  export default BookInput;