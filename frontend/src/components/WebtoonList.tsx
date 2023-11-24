import React, { ForwardedRef, forwardRef, useEffect, useState, useRef } from "react";
import { Grid, Paper, Typography, Link, Stack } from "@mui/material";
import { WebtoonBaseType } from "@src/types";
import { Box } from "@mui/material";
import { genres, webtoons } from "@src/utils/constants";
import { useSearchParams } from "react-router-dom";

const WebtoonList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [webtoons, setWebtoons] = useState<WebtoonBaseType[]>([]);
  const lastWebtoonRef = useRef<HTMLElement>(null);
  const platform = searchParams.get("platform");
  const genres = searchParams.getAll("genres").toString();
  const dayOfWeeks = searchParams.getAll("dayOfWeeks").toString();

  useEffect(() => {
    void fetch(
      `${import.meta.env.VITE_API_BASE_URL as string}/webtoon/list${window.location.search}`
    )
      .then((res) => res.json())
      .then((data: { totalPage: number; page: number; data: WebtoonBaseType[] }) => {
        setWebtoons(data.data);
      });
  }, [platform, genres, dayOfWeeks]);

  return (
    <Grid container rowSpacing={5} spacing={3}>
      {webtoons.map((webtoon, index) => (
        <Grid item xs={6} sm={3} md={2} key={index}>
          <Link href={`/webtoon/${webtoon.id}`} style={{ textDecoration: "none" }}>
            <Paper elevation={5}>
              <Box component="img" sx={{ width: "100%", height: 180 }} src={webtoon.thumbnail} />
              <Typography variant="h6">{webtoon.titleName}</Typography>
              <Typography variant="subtitle1">{webtoon.authors}</Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default WebtoonList;
