import useSearch from "./useSearch";
import { TextField } from "@mui/material";

const BooksSearch = () => {
  const { handleNewBooks, searchBooks, value, items } = useSearch();
  return (
    <>
      <div>
        <form onSubmit={searchBooks}>
          <TextField
            onChange={handleNewBooks}
            value={value}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
        </form>
      </div>
    </>
  );
};

export default BooksSearch;
