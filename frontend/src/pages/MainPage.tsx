import React, { useState, useEffect, useRef } from "react";
import { Container, Box } from "@mui/material";
import { PlatformKind, DayOfWeekKind } from "@src/types";
import { genres, webtoons } from "@src/utils/constants";
import { WebtoonList, Header, DayOfWeek, Platforms, Genres } from "@src/components";
import axios from "axios";
import { WebtoonBase } from "@src/types";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [category, setCategory] = useState({
    platform: "all",
    dayOfWeeks: [],
    genres: [],
  });
  const [webtoons, setWebtoons] = useState<WebtoonBase[]>([]);
  const lastWebtoonRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const handleDayOfWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = event.target.name as DayOfWeekKind;
  };

  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ mt: 3 }}>
        <Header />
      </Box>
      <Container maxWidth="lg">
        <Box component="nav">
          <Platforms handleDayOfWeek={handleDayOfWeek} />
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
        <Box>
          <Box ref={lastWebtoonRef}></Box>
        </Box>
      </Container>
    </Container>
  );
};

export default MainPage;
