import React from "react";
import { Grid, Paper, Typography, Link } from "@mui/material";

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
    <Grid container rowSpacing={1} spacing={1}>
      {webtoons.map((webtoon) => (
        <Grid item xs={6} sm={3} md={2} key={webtoon.id}>
          <Link>
            <Paper elevation={5}>
              <img src={webtoon.thumbnail} width={160} height={207} alt="" />
              <Typography color="primary">{webtoon.titleId}</Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default WebtoonList;
