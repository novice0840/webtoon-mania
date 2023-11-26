import React, { useEffect, useState } from "react";
import { Container, Box, Stack, Typography, Card, Paper, Link } from "@mui/material";
import { Header, WebtoonDetail, CommentBox } from "@src/components";
import { webtoon } from "@src/utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import { WebtoonDetailType } from "@src/types";

const WebtoonPage = () => {
  const navigate = useNavigate();
  const [webtoonDetail, setWebtoonDetail] = useState<WebtoonDetailType>({
    id: "0056174c-cda3-43de-afe3-f6da70e58037",
    titleId: "740482",
    platform: "naver",
    titleName: "11me",
    thumbnail:
      "https://image-comic.pstatic.net/webtoon/740482/thumbnail/thumbnail_IMAG21_7017279137093267812.jpg",
    interestCount: 29299,
    starScore: 9.88435,
    description: "",
    viewCount: 0,
    likeCount: 0,
    isEnd: true,
    link: "https://comic.naver.com/webtoon/list?titleId=740482",
    genres: ["2019 지상최대공모전", "드라마", "완결드라마"],
    dayOfWeeks: ["Saturday"],
    authors: ["고지애", "영재영"],
  });

  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ mt: 3 }}>
        <Header />
      </Box>
      <Container maxWidth="md">
        <Box sx={{ mt: 2, mb: 2 }}>
          <WebtoonDetail webtoonDetail={webtoonDetail} />
        </Box>
        <Box>
          <CommentBox />
        </Box>
      </Container>
    </Container>
  );
};

export default WebtoonPage;
