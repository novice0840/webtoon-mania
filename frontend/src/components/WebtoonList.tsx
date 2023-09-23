import React from "react";
import { Grid, Paper, Typography, Link, Box, Stack } from "@mui/material";
import { WebtoonBase } from "@src/types";

const WebtoonList = ({ webtoons }: { webtoons: WebtoonBase[] }) => {
  console.log(webtoons);
  return (
    <Grid container rowSpacing={5} spacing={3}>
      {webtoons.map((webtoon, index) => (
        <Grid item xs={6} sm={3} md={2} key={index}>
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
