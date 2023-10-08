import { MainPage, WebtoonPage, ErrorPage, TestPage } from "@src/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "webtoon/:platform/:id",
    element: <WebtoonPage />,
    errorElement: <ErrorPage />,
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
