import React from "react";
import { webtoon } from "@src/utils/constants";
import { Container, Box, Stack, Typography, Card, Paper, Link } from "@mui/material";
import { WebtoonDetailType } from "@src/types";

type PropTypes = {
  webtoonDetail: WebtoonDetailType;
};

const WebtoonDetail = ({ webtoonDetail }: PropTypes) => {
  return (
    <Card elevation={5} sx={{ minHeight: 250, p: 2 }}>
      <Stack direction="row">
        <Link>
          <Box
            component="img"
            sx={{ height: 200, width: 180, borderRadius: "10%", mr: 5 }}
            src={webtoonDetail.thumbnail}
          />
        </Link>

        <Box>
          <Typography variant="h4">{webtoonDetail.titleName}</Typography>
          <Typography>관심도 {webtoonDetail.interestCount}</Typography>
          <Typography>
            별점 {webtoonDetail.starScore} 좋아요 {webtoonDetail.likeCount} 조회수{" "}
            {webtoonDetail.viewCount}
          </Typography>
          <Typography></Typography>
          <Typography>{webtoonDetail.isEnd ? "완결웹툰" : "연재웹툰"}</Typography>
          <Stack direction="row">
            {webtoonDetail.dayOfWeeks.map((element) => (
              <Typography sx={{ mr: 1 }} key={element}>
                {element}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row">
            {webtoonDetail.genres.map((element) => (
              <Paper sx={{ m: 1 }} elevation={3} key={element}>
                #{element}
              </Paper>
            ))}
          </Stack>
          <Typography>{webtoonDetail.description}</Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default WebtoonDetail;
