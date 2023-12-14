import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data: { access_token: string }) => {
        document.cookie = `access_token=${data.access_token}; Path=/`;
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        로그인
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
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
export default SignIn;
