import { Route, Routes } from "react-router-dom";
import Main from "pages/Main";
import Weekday from "pages/Weekday";
import Webtoon from "pages/Webtoon";
import { useQuery } from "react-query";
import { getAllWebtoon } from "api/cralwer";
import { useRecoilState } from "recoil";
import { allwebtoonState } from "recoil/state";
import Layout from "components/Layout";
import { useEffect } from "react";

const App = () => {
  const { status, data, error } = useQuery("allwebtoon", getAllWebtoon);
  const [allwebtoon, setAllwebtoon] = useRecoilState(allwebtoonState);
  useEffect(() => {
    setAllwebtoon(data);
  }, []);
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
