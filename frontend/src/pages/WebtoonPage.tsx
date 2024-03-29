import { Container, Box } from "@mui/material";
import { Header, WebtoonDetail, CommentBox, ChatRoom } from "@src/components";

const WebtoonPage = () => {
  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ mt: 3 }}>
        <Header />
      </Box>
      <Container maxWidth="md">
        <Box sx={{ mt: 2, mb: 2 }}>
          <WebtoonDetail />
        </Box>
        <Box>
          <CommentBox />
        </Box>
      </Container>
      <ChatRoom />
    </Container>
  );
};

export default WebtoonPage;
