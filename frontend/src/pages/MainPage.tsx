import React, { useState, useEffect, useRef } from "react";
import { Container, Box } from "@mui/material";
import { PlatformKind, DayOfWeekKind } from "@src/types";
import { genres, webtoons } from "@src/utils/constants";
import { WebtoonList, Header, DayOfWeek, Platforms, Genres } from "@src/components";
import axios from "axios";
import { WebtoonBase } from "@src/types";
import { useNavigate, redirect, useLocation } from "react-router-dom";

const Main = () => {
  const [platform, setPlatform] = useState<PlatformKind>("all");
  const [dayOfWeeks, setDayOfWeeks] = useState<DayOfWeekKind[]>([]);
  const [search, setSearch] = useState<string>("");
  const [webtoons, setWebtoons] = useState<WebtoonBase[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const lastWebtoonRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = () => {
    console.log("submit click");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePlatform = (event: React.SyntheticEvent, value: PlatformKind) => {
    setPlatform(value);
    if (value === "all") navigate("?platform=all");
    else {
      navigate(`?platform=${value}`);
    }
  };

  const handleDayOfWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeeks([...dayOfWeeks, event.target.name as DayOfWeekKind]);
  };

  const fetchDatainit = async (): Promise<void> => {
    const params: { platform?: string } = {};
    if (platform !== "all") params.platform = platform;
    try {
      const response = await axios.get<{
        info: { totalPage: number; page: number };
        data: WebtoonBase[];
      }>(`http://localhost:3001/webtoon/list?page=${page}`, { params });
      const data = response.data;
      setPage(1);
      setTotalPage(data.info.totalPage);
      setWebtoons([...data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataPlus = async (): Promise<void> => {
    const params: { platform?: string } = {};
    if (platform !== "all") params.platform = platform;
    try {
      const response = await axios.get<{
        info: { totalPage: number; page: number };
        data: WebtoonBase[];
      }>(`http://localhost:3001/webtoon/list?page=${page}`, { params });
      const data = response.data;
      setTotalPage(data.info.totalPage);
      setWebtoons([...webtoons, ...data.data]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    void fetchDatainit();
  }, [platform]);

  useEffect(() => {
    void fetchDataPlus();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      console.log(totalPage);
      if (entries[0].isIntersecting && page <= totalPage) {
        observer.unobserve(lastWebtoonRef.current as HTMLElement);
        setPage(page + 1);
        observer.observe(lastWebtoonRef.current as HTMLElement);
      }
    });
    observer.observe(lastWebtoonRef.current as HTMLElement);
    return () => observer.disconnect();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ mt: 3 }}>
        <Header search={search} handleSearch={handleSearch} handleSubmit={handleSubmit} />
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
        <Box>
          <Box ref={lastWebtoonRef}></Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Main;
