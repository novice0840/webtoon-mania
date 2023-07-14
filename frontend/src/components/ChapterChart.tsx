import { LineChart } from "@mui/x-charts";
import { Chapter } from "@src/types/webtoon";

const ChapterChart = ({ data }: { data: Chapter[] }) => {
  return (
    <LineChart
      width={1000}
      height={300}
      series={[
        { data: [...data.map((chapter) => chapter.total_star)], label: "총 별점", yAxisKey: "leftAxisId" },
        { data: [...data.map((chapter) => chapter.average_star)], label: "평균 별점", yAxisKey: "rightAxisId" },
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
