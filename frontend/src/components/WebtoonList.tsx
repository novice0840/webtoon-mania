import React from "react";
import { Grid, Paper, Typography, Link, Box, Stack } from "@mui/material";

const WebtoonList = ({
  webtoons,
}: {
  webtoons: {
    id: string;
    titleId: string;
    thumbnail: string;
    authors: string[];
  }[];
}) => {
  return (
    <Grid container rowSpacing={5} spacing={3}>
      {webtoons.map((webtoon) => (
        <Grid item xs={6} sm={3} md={2} key={webtoon.id}>
          <Link style={{ textDecoration: "none" }}>
            <Paper elevation={5}>
              <Box component="img" sx={{ width: "100%", height: 180 }} src={webtoon.thumbnail} />
              <Typography variant="h6">{webtoon.titleId}</Typography>
              <Typography variant="subtitle1">
                {webtoon.authors.map((author) => `${author} / `)}
              </Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default WebtoonList;
