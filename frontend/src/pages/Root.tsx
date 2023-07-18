import { Day, WebtoonSort, Tag } from "@src/types/webtoon";
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
import { webtoonSorts, webtoonDayOfWeeks, webtoonTags } from "@src/utils/transform";

const Main = () => {
  const [webtoonSort, setWebtoonSort] = useState<WebtoonSort>("title");
  const [search, setSearch] = useState<string>("");
  const [days, setDays] = useState<Day[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

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
    } else if (event.target.name === "tag") {
      const newTag = event.target.value as Tag;
      if (tags.includes(newTag)) {
        setTags([...tags.filter((day) => day != newTag)]);
      } else {
        setTags([...tags, newTag]);
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
      <FormGroup row onChange={handleChange}>
        <FormLabel id="demo-row-radio-buttons-group-label">태그</FormLabel>
        <FormGroup row>
          {webtoonTags.map((tag) => (
            <FormControlLabel key={tag} name="tag" value={tag} control={<Checkbox />} label={tag} />
          ))}
        </FormGroup>
      </FormGroup>
      <FormGroup onChange={handleChange}>
        <FormLabel id="demo-row-radio-buttons-group-label">요일</FormLabel>
        <FormGroup row>
          {webtoonDayOfWeeks.map((day) => (
            <FormControlLabel key={day.value} name="day" value={day.value} control={<Checkbox />} label={day.label} />
          ))}
        </FormGroup>
      </FormGroup>
      <FormControl sx={{ mb: 5 }}>
        <FormLabel id="demo-row-radio-buttons-group-label">정렬</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="sort-group"
          defaultValue="title"
          onChange={handleChange}
        >
          {webtoonSorts.map((sort) => (
            <FormControlLabel key={sort.value} value={sort.value} control={<Radio />} label={sort.label} />
          ))}
        </RadioGroup>
      </FormControl>
      <WebtoonGrid search={search} days={days} webtoonSort={webtoonSort} tags={tags} />
    </Container>
  );
};

export default Main;
