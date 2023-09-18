import React from "react";
import { webtoon } from "@src/utils/constants";
import { Container, Box, Stack, Typography, Card, Paper, Link } from "@mui/material";

const WebtoonDetail = () => {
  return (
    <Card elevation={5} sx={{ minHeight: 250, p: 2 }}>
      <Stack direction="row">
        <Link>
          <Box
            component="img"
            sx={{ height: 120, width: 180, borderRadius: "10%" }}
            src={webtoon.thumbnail}
          />
        </Link>

        <Box>
          <Typography variant="h4">{webtoon.titleName}</Typography>
          <Typography>관심도 {webtoon.interestCount}</Typography>
          <Typography>
            별점 {webtoon.starScore} 좋아요 {webtoon.likeCount} 조회수 {webtoon.viewCount}
          </Typography>
          <Typography></Typography>
          <Typography>{webtoon.isEnd ? "완결웹툰" : "연재웹툰"}</Typography>
          <Stack direction="row">
            {webtoon.dayOfWeeks.map((element) => (
              <Typography sx={{ mr: 1 }} key={element.day}>
                {element.day}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row">
            {webtoon.genres.map((element) => (
              <Paper sx={{ m: 1 }} elevation={3} key={element.tag}>
                #{element.tag}
              </Paper>
            ))}
          </Stack>
          <Typography>{webtoon.description}</Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default WebtoonDetail;
