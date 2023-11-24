import React from "react";
import { Checkbox, FormLabel, FormGroup, FormControl, FormControlLabel } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const DayOfWeek = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dayOfWeeks = searchParams.getAll("dayOfWeeks");

  const handleDayOfWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dayOfWeek = event.target.name;
    if (dayOfWeeks.includes(dayOfWeek)) {
      setSearchParams({ dayOfWeeks: dayOfWeeks.filter((element) => element !== dayOfWeek) });
    } else {
      setSearchParams({ dayOfWeeks: [...dayOfWeeks, dayOfWeek] });
    }
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
        <FormControlLabel control={<Checkbox name="End" />} label="완결웹툰" />
      </FormGroup>
    </FormControl>
  );
};

export default DayOfWeek;
