import { Container, Box } from "@mui/material";
import React from "react";
import { Header, SignIn } from "@src/components";
const SignInPage = () => {
  <Container maxWidth="xl">
    <Box component="header" sx={{ mt: 3 }}>
      <Header />
    </Box>
    <Container maxWidth="lg">
      <SignIn></SignIn>
    </Container>
  </Container>;
};

export default SignInPage;
