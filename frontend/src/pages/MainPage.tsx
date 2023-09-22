import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { PlatformKind, DayOfWeekKind } from "@src/types";
import { genres, webtoons } from "@src/utils/constants";
import { WebtoonList, Header, DayOfWeek, Platforms, Genres } from "@src/components";
import axios from "axios";

const Main = () => {
  const [platform, setPlatform] = useState<PlatformKind>("all");
  const [dayOfWeeks, setDayOfWeeks] = useState<DayOfWeekKind[]>([]);
  // const [webtoons, setWebtoons] = useState();

  const handlePlatform = (event: React.SyntheticEvent, value: PlatformKind) => {
    setPlatform(value);
  };

  const handleDayOfWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeeks([...dayOfWeeks, event.target.name as DayOfWeekKind]);
  };

  const fetchData = async (page: number): Promise<void> => {
    const params = { page };
    try {
      const response = await axios.get("http://localhost:3001/webtoon/list");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchData(1);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ mt: 3 }}>
        <Header />
      </Box>
      <Container maxWidth="lg">
        <Box component="nav">
          <Platforms platform={platform} handlePlatform={handlePlatform} />
        </Box>
        <Box sx={{ mt: 3 }}>
          <DayOfWeek handleDayOfWeek={handleDayOfWeek} />
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Genres genres={genres} />
        </Box>
        <Box>
          <WebtoonList webtoons={webtoons} />
        </Box>
      </Container>
    </Container>
  );
};

export default Main;
