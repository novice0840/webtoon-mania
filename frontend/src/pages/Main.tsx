import React, { useState } from "react";
import { Container, Box, TextField, Stack, Button, Link, Tabs, Tab } from "@mui/material";
import logo from "@src/assets/logo.jpg";
import { Platform } from "@src/types";

const Main = () => {
  const [platform, setPlaform] = useState<Platform>("all");

  const handleChange = (event: React.SyntheticEvent, value: Platform) => {
    setPlaform(value);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <Box component="img" sx={{ height: 80, width: 120, borderRadius: "10%" }} src={logo} />
          </Link>
          <TextField sx={{ width: 500 }}></TextField>
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="info">
              Sign up
            </Button>
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Container maxWidth="lg">
        <Box>
          <Tabs value={platform} onChange={handleChange} aria-label="webtoon platform tabs">
            <Tab label="전체" value="all" />
            <Tab label="네이버" value="naver" />
            <Tab label="카카오" value="kakao" />
            <Tab label="레진코믹스" value="lezhin" />
            <Tab label="탑툰" value="toptoon" />
            <Tab label="투믹스" value="toomics" />
          </Tabs>
        </Box>
      </Container>
    </Container>
  );
};

export default Main;
