import { Container, Box } from "@mui/material";
import React from "react";
import { Header } from "@src/components";

type PropTypes = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: PropTypes) => {
  return (
    <Container maxWidth="xl">
      <Box component="header" sx={{ my: 3 }}>
        <Header />
      </Box>
      <Container maxWidth="lg">{children}</Container>
    </Container>
  );
};

export default MainLayout;
