import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Typography variant="h3">
        <Link to="/" style={{ textDecoration: "none" }}>
          네이버 웹툰 분석기
        </Link>
      </Typography>
    </Box>
  );
};

export default Header;
