import { Book } from "@mui/icons-material";
import { TextField, Button, Container } from "@mui/material";
import { SetStateAction, useState } from "react";
import BookInput from "../book-new";

interface GoogleBook {
  volumeInfo: any;
  items: {
    title: string;
    author: string;
    image: string;
    description: string;
    isbn: string;
  };
}

type PropsBook = {
  volumeInfo: any;
  items: Array<GoogleBook>;
};

interface Item {
  volumeInfo: any;
  items: {
    title: string;
    author: string;
    image: string;
    description: string;
    isbn: string;
  };
}

const BooksSearch = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const handleNewBooks = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  const searchBooks = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === "") return;
    const endpoint = "https://www.googleapis.com/books/v1";
    const res = await fetch(`${endpoint}/volumes?q=${value}`);
    const data = await res.json();
    const dataFormat = data.items.map((item: Item) => {
      const Info = item.volumeInfo;
      return {
        title: Info.title,
        description: Info.description,
        author: Info.authors,
        isbn: Info.industryIdentifiers,
        link: Info.infoLink,
        image: Info.imageLinks ? Info.imageLinks.smallThumbnail : "",
      };
    });
    setItems(dataFormat[0]);
  };

  return (
    <>
      <div>
        <Container>
          <form onSubmit={searchBooks}>
            <TextField
              onChange={handleNewBooks}
              value={value}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <Button variant="contained" type="submit">
              検索
            </Button>
          </form>
        </Container>
      </div>
      <BookInput items={items} />
    </>
  );
};

export default BooksSearch;
