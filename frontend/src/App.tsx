import {
  MainPage,
  WebtoonPage,
  ErrorPage,
  SignInPage,
  SignUpPage,
  UserInfoPage,
  TestPage,
} from "@src/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "webtoon/:platform/:titleId",
  //   element: <WebtoonPage />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "user/info",
    element: <UserInfoPage />,
  },
  {
    path: "user/signup",
    element: <SignUpPage />,
  },
  {
    path: "user/signin",
    element: <SignInPage />,
  },
  {
    path: "test",
    element: <TestPage />,
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
