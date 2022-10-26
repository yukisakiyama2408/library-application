import { gql,useQuery,useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from 'next/router';

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

const UPDATE_BOOK = gql `
mutation updateBook($id:Int!,$title: String!, $author: String!,$image_url: String!) {
  update_books_table(where:{id:{_eq:$id}}, _set: {title: $title, author: $author,image_url:$image_url}) {
        affected_rows
        returning {
          id
          title
          author
          image_url
        }
      }}
`;


interface Book{
  id: number; title: string; author:string,image_url:string 
}

const BookUpdate =()=>{
  const router = useRouter();
  const id = router.query.id
  // console.log(id)
  const {data} = useQuery(GET_BOOK,{
      variables:{id}
  })
  // console.log(data)
  const book:Book= !data? []:data.books_table[0]
  const [title, setTitle] = useState(book.title);
  const [author,setAuthor] = useState(book.author)
  const [image_url,setImage_url] = useState(book.image_url)
  const [updateBook] = useMutation(UPDATE_BOOK,
    {
      onCompleted:()=>{
        setTitle(" "),
        setAuthor(" "),
        setImage_url(" ")
      }
    });
  const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()
    await updateBook({
      variables:{ id: id, title: title, author:author,image_url:image_url},
    })
    router.push(`/book/${book.id}`)
  }

    return <div>
      <div>{book.title}</div>
      <div>
        <form onSubmit={e => handleUpdateBook(e)}>
          <input
          type="text"
          name="title"
          placeholder="本のタイトル"
          // defaultValue={book.title}
          value={title}
          onChange={e => (setTitle(e.target.value))}
          />
          <input
          type="text"
          placeholder="著者"
          // defaultValue={book.author}
          value={author}
          onChange={e => (setAuthor(e.target.value))}
          />
          <input
          type="text"
          name="image_url"
          // defaultValue={book.image_url}
          placeholder="画像URL"
          value={image_url}
          onChange={e => (setImage_url(e.target.value))}
          />
          <button type="submit">更新</button>
          </form>
          </div>
          </div>
          }

export default BookUpdate