import { Link } from "react-router-dom";
import { Webtoon, Day, Sort } from "@src/types/webtoon";
import { getAllWebtoon } from "@src/api/webtoon";
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
import { useState, ChangeEvent, useEffect } from "react";
import { compareInterest, compareNew, compareOld, compareStar, compareTitle } from "@src/utils/compare";
import Header from "@src/components/Header";

const Main = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [webtoonList, setWebtoonList] = useState<Webtoon[]>();
  const [sort, setSort] = useState<Sort>("title");
  const [input, setInput] = useState<string>("");
  const [days, setDays] = useState<Day[]>([]);

  const compareConverter: Record<Sort, (a: Webtoon, b: Webtoon) => -1 | 0 | 1> = {
    title: compareTitle,
    old: compareOld,
    new: compareNew,
    interest: compareInterest,
    star: compareStar,
  };

  const dayConverter: Record<string, Day> = {
    월요웹툰: "monday",
    화요웹툰: "tuesday",
    수요웹툰: "wednesday",
    목요웹툰: "thusday",
    금요웹툰: "friday",
    토요웹툰: "saturday",
    일요웹툰: "sunday",
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "input-filter") {
      setInput(event.target.value);
    } else if (event.target.name === "sort-group") {
      setSort(event.target.value as Sort);
    } else if (event.target.name === "day") {
      const newDay = event.target.value as Day;
      if (days.includes(newDay)) {
        setDays([...days.filter((day) => day != newDay)]);
      } else {
        setDays([...days, newDay]);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllWebtoon()
      .then((data) => {
        setWebtoonList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return <div>잠시만 기다려주세요 로딩중입니다</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다</div>;
  }

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
          value={input}
        />
      </Box>
      <FormGroup onChange={handleChange} row>
        <FormControlLabel name="day" value="monday" control={<Checkbox />} label="월요웹툰" />
        <FormControlLabel name="day" value="tuesday" control={<Checkbox />} label="화요웹툰" />
        <FormControlLabel name="day" value="wednesday" control={<Checkbox />} label="수요웹툰" />
        <FormControlLabel name="day" value="thurday" control={<Checkbox />} label="목요웹툰" />
        <FormControlLabel name="day" value="friday" control={<Checkbox />} label="금요웹툰" />
        <FormControlLabel name="day" value="satursday" control={<Checkbox />} label="토요웹툰" />
        <FormControlLabel name="day" value="sunday" control={<Checkbox />} label="일요웹툰" />
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

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {webtoonList
          ?.slice()
          .filter((webtoon) => webtoon.title.includes(input) || input === "")
          .filter((webtoon) => days.includes(dayConverter[webtoon.day]) || days.length === 0)
          .sort(compareConverter[sort])
          .map((webtoon: Webtoon) => (
            <Box sx={{ margin: 1 }} key={webtoon.id}>
              <Link style={{ textDecoration: "none" }} to={"/webtoon/" + webtoon.id.toString()}>
                <Box key={webtoon.id}>
                  <img src={webtoon.thumbnail} width={160} height={207} alt="" />
                  <div>{webtoon.title}</div>
                  <div>{webtoon.id}</div>
                  <div>{webtoon.day}</div>
                  <div>관심웹툰: {webtoon.interest_count}</div>
                </Box>
              </Link>
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Main;
