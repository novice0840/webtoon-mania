import React from "react";
import { Checkbox, FormLabel, FormGroup, FormControl, FormControlLabel } from "@mui/material";

type PropTypes = {
  handleDayOfWeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DayOfWeek = ({ handleDayOfWeek }: PropTypes) => {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel>요일</FormLabel>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="Monday" />}
          label="월요웹툰"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="Thuesday" />}
          label="화요웹툰"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="Wednesday" />}
          label="수요웹툰"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="Thursday" />}
          label="목요웹툰"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="Friday" />}
          label="금요웹툰"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="Saturday" />}
          label="토요웹툰"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="Sunday" />}
          label="일요웹툰"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleDayOfWeek} name="End" />}
          label="완결웹툰"
        />
      </FormGroup>
    </FormControl>
  );
};

export default DayOfWeek;
