import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
    };
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        회원가입
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="이름" name="name" margin="normal" required fullWidth />
        <TextField label="이메일" name="email" margin="normal" required fullWidth />
        <TextField
          label="비밀번호"
          name="password"
          margin="normal"
          type="password"
          required
          fullWidth
        />
        <Button type="submit" variant="contained">
          제출하기
        </Button>
      </Box>
    </Container>
  );
};
export default SignUp;
