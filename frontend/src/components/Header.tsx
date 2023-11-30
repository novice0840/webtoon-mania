import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  Stack,
  Button,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SignUp, SignIn } from "@src/components";
import logo from "@src/assets/logo.jpg";
import { getCookie, deleteCookie } from "@src/utils/cookie";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const getUserInfo = () => {
    const access_token = getCookie("access_token") || "";
    void fetch(`${import.meta.env.VITE_API_BASE_URL as string}/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data: { name: string }) => {
        if (data?.name) {
          setUserName(data.name);
        } else {
          setUserName("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleLogout = () => {
    deleteCookie("access_token");
    getUserInfo();
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
      {userName === "" ? (
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
      ) : (
        <Stack spacing={2} direction="row">
          <Typography component="h1" variant="h5">
            {userName}님
          </Typography>
          <Button onClick={handleLogout} variant="contained">
            로그아웃{" "}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
