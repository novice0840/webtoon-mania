import React from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  Card,
  Paper,
  Link,
  Button,
  TextField,
} from "@mui/material";
import { comments } from "@src/utils/constants";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const CommentBox = () => {
  return (
    <Container>
      <Box component="form">
        <TextField
          label="댓글 쓰기"
          variant="outlined"
          InputProps={{ sx: { height: 150 } }}
          sx={{ width: 80 / 100, mr: 3 }}
        />
        <Button variant="contained">작성</Button>
      </Box>
      <Box>
        {comments.map((comment) => (
          <Paper elevation={3} key={comment.id} sx={{ p: 1, m: 1 }}>
            <Typography>{comment.writer}</Typography>
            <Typography>{comment.content}</Typography>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 1 }}
                startIcon={<ThumbUpOffAltIcon />}
              >
                {comment.like}
              </Button>
              <Button variant="outlined" color="error" startIcon={<ThumbDownOffAltIcon />}>
                {comment.dislike}
              </Button>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default CommentBox;
