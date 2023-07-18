import { Day, WebtoonSort } from "@src/types/webtoon";
import {
  Container,
  Box,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  TextField,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import Header from "@src/components/Header";
import WebtoonGrid from "@src/components/WebtoonGrid";

const Main = () => {
  const [webtoonSort, setWebtoonSort] = useState<WebtoonSort>("title");
  const [search, setSearch] = useState<string>("");
  const [days, setDays] = useState<Day[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "input-filter") {
      setSearch(event.target.value);
    } else if (event.target.name === "sort-group") {
      setWebtoonSort(event.target.value as WebtoonSort);
    } else if (event.target.name === "day") {
      const newDay = event.target.value as Day;
      if (days.includes(newDay)) {
        setDays([...days.filter((day) => day != newDay)]);
      } else {
        setDays([...days, newDay]);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Box component="form" sx={{ width: "100%", mt: 5 }} noValidate autoComplete="off">
        <TextField
          onChange={handleChange}
          fullWidth
          id="outlined-basic"
          label="찾고싶은 웹툰의 제목을 입력하세요"
          variant="outlined"
          name="input-filter"
          value={search}
        />
      </Box>
      <FormGroup onChange={handleChange} row>
        <FormControlLabel name="day" value="MONDAY" control={<Checkbox />} label="월요웹툰" />
        <FormControlLabel name="day" value="TUESDAY" control={<Checkbox />} label="화요웹툰" />
        <FormControlLabel name="day" value="WEDNESDAY" control={<Checkbox />} label="수요웹툰" />
        <FormControlLabel name="day" value="THURDAY" control={<Checkbox />} label="목요웹툰" />
        <FormControlLabel name="day" value="FRIDAY" control={<Checkbox />} label="금요웹툰" />
        <FormControlLabel name="day" value="SATURDAY" control={<Checkbox />} label="토요웹툰" />
        <FormControlLabel name="day" value="SUNDAY" control={<Checkbox />} label="일요웹툰" />
      </FormGroup>
      <FormControl sx={{ mb: 5 }}>
        <FormLabel id="demo-row-radio-buttons-group-label">정렬하기</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="sort-group"
          defaultValue="title"
          onChange={handleChange}
        >
          <FormControlLabel value="title" control={<Radio />} label="제목순" />
          <FormControlLabel value="old" control={<Radio />} label="연재 오래된순" />
          <FormControlLabel value="new" control={<Radio />} label="연재 빠른순" />
          <FormControlLabel value="interest" control={<Radio />} label="관심웹툰순" />
          <FormControlLabel value="star" control={<Radio />} label="별점순" />
        </RadioGroup>
      </FormControl>
      <WebtoonGrid search={search} days={days} webtoonSort={webtoonSort} />
    </Container>
  );
};

export default Main;
