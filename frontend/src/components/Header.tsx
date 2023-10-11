import { useState, useRef } from "react";
import { Box, Paper, InputBase, IconButton, Stack, Button, Link, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SignUp, SignIn } from "@src/components";
import logo from "@src/assets/logo.jpg";

const Header = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Link href="/">
        <Box component="img" sx={{ height: 80, width: 120, borderRadius: "10%" }} src={logo} />
      </Link>
      <Paper
        elevation={5}
        component="form"
        sx={{ display: "flex", alignItems: "center", width: 600 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={handleSearch}
          placeholder="검색어를 입력해주세요"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          검색
        </IconButton>
      </Paper>
      <Stack spacing={2} direction="row">
        <Link href="/user/signin">
          <Button variant="contained" color="primary">
            Sign in
          </Button>
        </Link>
        <Link href="/user/signup">
          <Button variant="contained" color="info">
            Sign up
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Header;
