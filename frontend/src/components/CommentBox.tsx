import React, { useEffect, useState } from "react";
import { Container, Box, Stack, Typography, Paper, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useParams } from "react-router-dom";
import { CommentType } from "@src/types";
import { useNavigate } from "react-router-dom";
import { getCookie } from "@src/utils/cookie";

const CommentBox = () => {
  const access_token = getCookie("access_token") || "";
  const { webtoonId = "" } = useParams();
  const [content, setContent] = useState("");

  const [comments, setComments] = useState<CommentType[]>([]);
  const navigate = useNavigate();

  const getComments = () => {
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/comment/webtoon/${webtoonId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
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
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/comment/webtoon/${webtoonId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then((data) => {
        setContent("");
        getComments();
      })
      .catch((error) => {
        navigate("/signin");
      });
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleCommentDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const commentId = event.currentTarget.name;
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    const commentId = event.currentTarget.name;
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/comment/like/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDislike = (event: React.MouseEvent<HTMLButtonElement>) => {
    const commentId = event.currentTarget.name;
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/comment/dislike/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="content"
          label="댓글 쓰기"
          onChange={handleCommentChange}
          variant="outlined"
          InputProps={{ sx: { height: 150 } }}
          sx={{ width: 80 / 100, mr: 3 }}
          value={content}
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
                name={comment.id}
                onClick={handleLike}
                sx={{ mr: 1 }}
                startIcon={<ThumbUpOffAltIcon />}
              >
                {comment.like}
              </Button>
              <Button
                variant="outlined"
                name={comment.id}
                sx={{ mr: 1 }}
                color="error"
                onClick={handleDislike}
                startIcon={<ThumbDownOffAltIcon />}
              >
                {comment.dislike}
              </Button>
              {comment?.my && (
                <Button
                  name={comment.id}
                  onClick={handleCommentDelete}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  삭제
                </Button>
              )}
            </Stack>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default CommentBox;
