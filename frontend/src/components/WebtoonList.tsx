import { useEffect, useState, useRef } from "react";
import { Grid, Paper, Typography, Link, Stack } from "@mui/material";
import { WebtoonBaseType } from "@src/types";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const WebtoonList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [webtoons, setWebtoons] = useState<WebtoonBaseType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(1);
  const lastWebtoonRef = useRef<Element>(null);
  const platform = searchParams.get("platform");
  const genres = searchParams.getAll("genres").toString();
  const dayOfWeeks = searchParams.getAll("dayOfWeeks").toString();
  const isEnd = searchParams.get("isEnd") ? true : false;
  // let isLoading = false;

  // 첫 페이지 로딩
  useEffect(() => {
    void fetch(
      `${import.meta.env.VITE_API_BASE_URL as string}/webtoon/list${window.location.search}`
    )
      .then((res) => res.json())
      .then((data: { totalPage: number; page: number; data: WebtoonBaseType[] }) => {
        setCurPage(1);
        setTotalPage(data.totalPage);
        setWebtoons(data.data);
      });
  }, [platform, genres, dayOfWeeks, isEnd]);

  // 추가 페이지 로딩
  useEffect(() => {
    if (curPage === 1 || totalPage === 0 || curPage >= totalPage) return;
    void fetch(
      `${import.meta.env.VITE_API_BASE_URL as string}/webtoon/list${window.location.search}${
        window.location.search === "" ? `?page=${curPage}` : `&page=${curPage}`
      }`
    )
      .then((res) => res.json())
      .then((data: { totalPage: number; page: number; data: WebtoonBaseType[] }) => {
        setWebtoons([...webtoons, ...data.data]);
      });
  }, [curPage]);

  useEffect(() => {
    if (!lastWebtoonRef.current) return;
    const observer = new IntersectionObserver((entries: any) => {
      if (lastWebtoonRef.current && entries[0].isIntersecting) {
        console.log("intersecting");
        setCurPage((curPage) => curPage + 1);
      }
    });

    observer.observe(lastWebtoonRef.current);
    return () => observer.disconnect();
  }, []);

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
      {<Box ref={lastWebtoonRef}></Box>}
    </Grid>
  );
};

export default WebtoonList;
