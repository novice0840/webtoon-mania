import React, { useState, useEffect, useRef } from "react";
import { Container, Box } from "@mui/material";
import { PlatformKind, DayOfWeekKind, WebtoonBaseType } from "@src/types";
import { genres, webtoons } from "@src/utils/constants";
import { WebtoonList, Header, DayOfWeek, Platforms, Genres } from "@src/components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [webtoons, setWebtoons] = useState<WebtoonBaseType[]>([]);
  const lastWebtoonRef = useRef<HTMLElement>(null);
  const platform = searchParams.get("platform");
  const genres = searchParams.getAll("genres");
  const dayOfWeeks = searchParams.getAll("dayOfWeeks");

  useEffect(() => {
    console.log(import.meta.env.VITE_API_BASE_URL, platform, genres, dayOfWeeks);
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/webtoon/list`)
      .then((res) => res.json())
      .then((data: { totalPage: number; page: number; data: WebtoonBaseType[] }) => {
        console.log(data.data);
        setWebtoons(data.data);
      });
  });

  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ mt: 3 }}>
        <Header />
      </Box>
      <Container maxWidth="lg">
        <Box component="nav">
          <Platforms />
        </Box>
        <Box sx={{ mt: 3 }}>
          <DayOfWeek />
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Genres />
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
