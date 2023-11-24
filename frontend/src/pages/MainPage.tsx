import { Container, Box } from "@mui/material";
import { WebtoonList, Header, DayOfWeek, Platforms, Genres } from "@src/components";

const MainPage = () => {
  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ mt: 3 }}>
        <Header />
      </Box>
      <Container maxWidth="lg">
        <Box component="nav">
          <Platforms />
        </Box>
        <Box sx={{ mt: 3 }}>
          <DayOfWeek />
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Genres />
        </Box>
        <Box>
          <WebtoonList />
        </Box>
      </Container>
    </Container>
  );
};

export default MainPage;
