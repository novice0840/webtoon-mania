import React, { useEffect, useState } from "react";
import { Container, Box, Stack, Typography, Paper, Button, TextField } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useParams } from "react-router-dom";
import { CommentType } from "@src/types";
import { useNavigate } from "react-router-dom";
import { getCookie } from "@src/utils/cookie";

const CommentBox = () => {
  const { webtoonId = "" } = useParams();

  const [comments, setComments] = useState<CommentType[]>([]);
  const navigate = useNavigate();

  const getComments = () => {
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/comment/webtoon/${webtoonId}`)
      .then((res) => res.json())
      .then((data: CommentType[]) => {
        setComments(data);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const access_token = getCookie("access_token") || "";
    const data = new FormData(event.currentTarget);
    const body = {
      content: data.get("content"),
    };
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/comment/webtoon/${webtoonId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        getComments();
      })
      .catch((error) => {
        navigate("/signin");
      });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="content"
          label="댓글 쓰기"
          variant="outlined"
          InputProps={{ sx: { height: 150 } }}
          sx={{ width: 80 / 100, mr: 3 }}
        />
        <Button type="submit" variant="contained">
          작성
        </Button>
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
