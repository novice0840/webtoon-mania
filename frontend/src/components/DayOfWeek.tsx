import React from "react";
import { Checkbox, FormLabel, FormGroup, FormControl, FormControlLabel } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const DayOfWeek = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dayOfWeeks = searchParams.getAll("dayOfWeeks");
  const platform = searchParams.get("platform");
  const genres = searchParams.getAll("genres");
  const isEnd = searchParams.get("isEnd") ? true : false;

  const handleDayOfWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let newSearchParams = {};

    if (platform) newSearchParams = { ...newSearchParams, platform };
    if (genres) newSearchParams = { ...newSearchParams, genres };

    if (name === "isEnd") {
      if (isEnd) {
        newSearchParams = { ...newSearchParams, dayOfWeeks };
      } else {
        newSearchParams = { ...newSearchParams, dayOfWeeks, isEnd: true };
      }
    } else {
      if (dayOfWeeks.includes(name)) {
        newSearchParams = {
          ...newSearchParams,
          dayOfWeeks: dayOfWeeks.filter((element) => element !== name),
        };
      } else {
        newSearchParams = { ...newSearchParams, dayOfWeeks: [...dayOfWeeks, name] };
      }
    }

    setSearchParams(newSearchParams);
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel>요일</FormLabel>
      <FormGroup onChange={handleDayOfWeek} row>
        <FormControlLabel
          control={<Checkbox name="monday" checked={dayOfWeeks.includes("monday")} />}
          label="월요웹툰"
        />
        <FormControlLabel
          control={<Checkbox name="tuesday" checked={dayOfWeeks.includes("tuesday")} />}
          label="화요웹툰"
        />
        <FormControlLabel
          control={<Checkbox name="wednesday" checked={dayOfWeeks.includes("wednesday")} />}
          label="수요웹툰"
        />
        <FormControlLabel
          control={<Checkbox name="thursday" checked={dayOfWeeks.includes("thursday")} />}
          label="목요웹툰"
        />
        <FormControlLabel
          control={<Checkbox name="friday" checked={dayOfWeeks.includes("friday")} />}
          label="금요웹툰"
        />
        <FormControlLabel
          control={<Checkbox name="saturday" checked={dayOfWeeks.includes("saturday")} />}
          label="토요웹툰"
        />
        <FormControlLabel
          control={<Checkbox name="sunday" checked={dayOfWeeks.includes("sunday")} />}
          label="일요웹툰"
        />
        <FormControlLabel control={<Checkbox name="isEnd" checked={isEnd} />} label="완결웹툰" />
      </FormGroup>
    </FormControl>
  );
};

export default DayOfWeek;
