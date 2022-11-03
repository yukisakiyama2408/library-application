import { gql, useQuery} from '@apollo/client';
import Link from 'next/link';
import { Card ,CardContent,CardActionArea,CardMedia,Typography,Container,Button,Grid,styled} from '@mui/material';


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
    <>
    <div className='book-index-section'>
   
    <div>
    {books.map((book) => (
          <div key={book.id} className="book-card-index">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea href={`/book/${book.id}`}>
            <CardMedia
            component="img"
            height="500"
            image={book.image_url}
            alt="本の表紙"/>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
        </CardContent>
        </CardActionArea>
        </Card>
      </div>
    ))}
    </div>
    <div className='index-add-btn'>
      <Button variant="contained" href="/book/book-new">REGISTER</Button>
    </div>
    </div>
    </>
    )
}

export default BookIndex



