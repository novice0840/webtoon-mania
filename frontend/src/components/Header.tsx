import { useState, useRef } from "react";
import { Box, Paper, InputBase, IconButton, Stack, Button, Link, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SignUp, SignIn } from "@src/components";
import logo from "@src/assets/logo.jpg";

type PropTypes = {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const Header = ({ search, handleSearch, handleSubmit }: PropTypes) => {
  const signInRef = useRef<HTMLElement>(null);
  const signUpRef = useRef<HTMLElement>(null);
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

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
        <IconButton onClick={handleSubmit} type="button" sx={{ p: "10px" }} aria-label="search">
          검색
        </IconButton>
      </Paper>
      <Stack spacing={2} direction="row">
        <Modal
          open={signInOpen}
          onClose={handleSignInClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <SignIn ref={signInRef} />
        </Modal>
        <Modal
          open={signUpOpen}
          onClose={handleSignUpClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <SignUp ref={signUpRef} />
        </Modal>
        <Button variant="contained" color="primary" onClick={handleSignInOpen}>
          Sign in
        </Button>
        <Button variant="contained" color="info" onClick={handleSignUpOpen}>
          Sign up
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
