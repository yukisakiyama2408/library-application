import React,{useState} from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
// import {GET_BOOKS} from "./bookIndex"

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
    const [title, setTitle] = useState('');
    const [author,setAuthor] = useState("")
    const [image_url,setImage_url] = useState("")

    // const updateCache =(cache, {data})=>{
    //   const registeredBooks = cache.readQuery({
    //     query: GET_BOOKS
    //   });
    //   const newBooks = data.insert_books_table.returning[0];
    //   cache.writeQuery({
    //     query: GET_BOOKS,
    //     data: {books: [newBooks, ...registeredBooks.s]}
    //   });
    // };
    // }

    const [addBook] = useMutation(ADD_BOOK);

    return (
      <form className="formInput" onSubmit={(e) => {
        e.preventDefault();
        addBook({variables: {title: title, author:author,image_url:image_url }});

      }}>
        <input
          className="input"
          placeholder="本のタイトル"
          value={title}
          onChange={e => (setTitle(e.target.value))}
        />
         <input
          className="input"
          placeholder="著者"
          value={author}
          onChange={e => (setAuthor(e.target.value))}
        />
         <input
          className="input"
          placeholder="画像URL"
          value={image_url}
          onChange={e => (setImage_url(e.target.value))}
        />
        <i className="inputMarker fa fa-angle-right" />
      </form>
    );
  };
  
  export default BookInput;