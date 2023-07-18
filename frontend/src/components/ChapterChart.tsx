import { LineChart } from "@mui/x-charts";
import { Chapter } from "@src/types/webtoon";

const ChapterChart = ({ data }: { data: Chapter[] }) => {
  return (
    <LineChart
      width={1000}
      height={300}
      series={[
        { data: [...data.map((chapter) => chapter.totalStar)], label: "총 별점", yAxisKey: "leftAxisId" },
        { data: [...data.map((chapter) => chapter.averageStar)], label: "평균 별점", yAxisKey: "rightAxisId" },
      ]}
      sx={{
        ".MuiMarkElement-root": {
          scale: "0",
        },
      }}
      xAxis={[{ scaleType: "point", data: [...data.map((chapter) => chapter.id)] }]}
      yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
    />
  );
};

export default ChapterChart;
