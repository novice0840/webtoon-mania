import React, { ForwardedRef, forwardRef, useEffect, useState, useRef } from "react";
import { Grid, Paper, Typography, Link, Box, Stack } from "@mui/material";
import { WebtoonBase } from "@src/types";
import axios from "axios";

const WebtoonList = () => {
  const [webtoons, setWebtoons] = useState<WebtoonBase[]>([]);
  const lastWebtoonRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<{
        info: { totalPage: number; page: number };
        data: WebtoonBase[];
      }>(`http://localhost:3001/webtoon/list?page=${page}`);
      const data = response.data;
      setTotalPage(data.info.totalPage);
      setWebtoons([...webtoons, ...data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && page <= totalPage) {
        observer.unobserve(lastWebtoonRef.current as HTMLElement);
        setPage((page) => page + 1);
        observer.observe(lastWebtoonRef.current as HTMLElement);
      }
    });
    observer.observe(lastWebtoonRef.current as HTMLElement);
    return () => observer.disconnect();
  }, []);

  return (
    <Grid container rowSpacing={5} spacing={3}>
      {webtoons.map((webtoon, index, array) => (
        <Grid item xs={6} sm={3} md={2} key={index}>
          <Link style={{ textDecoration: "none" }}>
            <Paper elevation={5}>
              <Box component="img" sx={{ width: "100%", height: 180 }} src={webtoon.thumbnail} />
              <Typography variant="h6">{webtoon.titleName}</Typography>
              <Typography variant="subtitle1">
                {webtoon.authors.map((author) => `${author} `)}
              </Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
      <Box ref={lastWebtoonRef}></Box>
    </Grid>
  );
};

export default WebtoonList;
