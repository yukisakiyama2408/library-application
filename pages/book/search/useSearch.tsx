import { SetStateAction, useState } from "react";

const useSearch = () => {
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
    const dataFormat = data.items.map((item: { volumeInfo: any }) => {
      const Info = item.volumeInfo;
      return {
        title: Info.title,
        description: Info.description,
        link: Info.infoLink,
        image: Info.imageLinks ? Info.imageLinks.smallThumbnail : "",
      };
    });
    setItems(dataFormat);
  };

  return { handleNewBooks, searchBooks, items, value };
};

export default useSearch;
