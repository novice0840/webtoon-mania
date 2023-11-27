import React, { useEffect, useState } from "react";
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useParams } from "react-router-dom";
import { CommentType } from "@src/types";

const CommentBox = () => {
  const { webtoonId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    void fetch(
      `${import.meta.env.VITE_API_BASE_URL as string}/comment/webtoon/${webtoonId as string}`
    )
      .then((res) => res.json())
      .then((data: CommentType[]) => {
        setComments(data);
      });
  }, []);

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
            <Typography>{comment.writerName}</Typography>
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
