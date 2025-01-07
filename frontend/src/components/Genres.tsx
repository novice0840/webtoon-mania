import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dayOfWeeks = searchParams.getAll("dayOfWeeks");
  const platform = searchParams.get("platform");
  const genreParam = searchParams.getAll("genres");
  const isEnd = searchParams.get("isEnd") ? true : false;

  useEffect(() => {
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/webtoon/kinds`)
      .then((res) => res.json())
      .then((data: string[]) => {
        setGenres(data);
      });
  }, []);

  const handleGenres = (event: React.ChangeEvent<HTMLInputElement>) => {
    const genre = event.target.name;
    let newSearchParams = {};

    if (platform) newSearchParams = { ...newSearchParams, platform };
    if (dayOfWeeks) newSearchParams = { ...newSearchParams, dayOfWeeks };
    if (isEnd) newSearchParams = { ...newSearchParams, isEnd };

    if (genreParam.includes(genre)) {
      newSearchParams = {
        ...newSearchParams,
        genres: genreParam.filter((element) => element !== genre),
      };
    } else {
      newSearchParams = { ...newSearchParams, genres: [...genreParam, genre] };
    }
    console.log(genre);
    setSearchParams(newSearchParams);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>장르</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset" variant="standard">
          <FormGroup onChange={handleGenres} row>
            {genres.map((genre) => (
              <FormControlLabel
                key={genre}
                control={<Checkbox name={genre} checked={genreParam.includes(genre)} />}
                label={genre}
              />
            ))}
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default Genres;
