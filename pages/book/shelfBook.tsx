import { useState, useEffect } from "react";
import { BookShelfIndex } from "../../components/book/shelfBook-index";
import GlobalHeader from "../../components/globalHeader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Container } from "@mui/material";

const ShelfBook = () => {
  const [shelfId, setShefId] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setShefId(event.target.value);
  };

  return (
    <>
      <div>
        <GlobalHeader />
      </div>
      <div>
        <Container component="main" maxWidth="xs">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">本棚</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={shelfId}
              onChange={handleChange}
              label="棚のID"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>イベントスペース</MenuItem>
              <MenuItem value={2}>Social Lounge</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </div>
      <div>{shelfId && <BookShelfIndex shelfId={shelfId} />}</div>
    </>
  );
};

export default ShelfBook;
