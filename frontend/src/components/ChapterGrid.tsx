import { Chapter } from "@src/types/webtoon";
import { Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const ChapterGrid = ({ data }: { data: Chapter[] }) => {
  return (
    <Grid container spacing={1}>
      {data?.map((chapter: Chapter) => (
        <Grid item xs={2} key={chapter.id}>
          <Paper elevation={5}>
            <Link style={{ textDecoration: "none" }} key={chapter.id} to={"/chapter/" + chapter.id.toString()}>
              <img src={chapter.thumbnail} width={106} height={62} alt="" />
              <div>{chapter.name}</div>
              <div>{chapter.upload_data.split("T")[0]}</div>
              <div>평균 별점{chapter.average_star}</div>
              <div>별점 총합{chapter.total_star}</div>
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ChapterGrid;
