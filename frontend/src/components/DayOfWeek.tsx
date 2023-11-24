import React from "react";
import { Checkbox, FormLabel, FormGroup, FormControl, FormControlLabel } from "@mui/material";

type PropTypes = {
  handleDayOfWeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DayOfWeek = () => {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel>요일</FormLabel>
      <FormGroup row>
        <FormControlLabel control={<Checkbox name="Monday" />} label="월요웹툰" />
        <FormControlLabel control={<Checkbox name="Thuesday" />} label="화요웹툰" />
        <FormControlLabel control={<Checkbox name="Wednesday" />} label="수요웹툰" />
        <FormControlLabel control={<Checkbox name="Thursday" />} label="목요웹툰" />
        <FormControlLabel control={<Checkbox name="Friday" />} label="금요웹툰" />
        <FormControlLabel control={<Checkbox name="Saturday" />} label="토요웹툰" />
        <FormControlLabel control={<Checkbox name="Sunday" />} label="일요웹툰" />
        <FormControlLabel control={<Checkbox name="End" />} label="완결웹툰" />
      </FormGroup>
    </FormControl>
  );
};

export default DayOfWeek;
