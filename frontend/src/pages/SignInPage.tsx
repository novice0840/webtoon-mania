import { Container, Box } from "@mui/material";
import React from "react";
import MainLayout from "@src/layout/MainLayout";
import { SignIn } from "@src/components";
const SignInPage = () => {
  return (
    <MainLayout>
      <SignIn></SignIn>
    </MainLayout>
  );
};

export default SignInPage;
