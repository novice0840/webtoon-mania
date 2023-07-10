import { Route, Routes } from "react-router-dom";
import Main from "pages/Main";
import Weekday from "pages/Weekday";
import Webtoon from "pages/Webtoon";
import Layout from "components/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/weekday/:weekday" element={<Weekday />} />
        <Route path="/webtoon/:titleId" element={<Webtoon />} />
      </Routes>
    </Layout>
  );
};

export default App;
