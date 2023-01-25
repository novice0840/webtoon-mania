import { Route, Routes } from "react-router-dom";
import Main from "pages/Main";
import Weekday from "pages/Weekday";
import Webtoon from "pages/Webtoon";
import { useQuery } from "react-query";
import { getAllWebtoon } from "api/cralwer";
import { useRecoilState } from "recoil";
import { allwebtoonState } from "recoil/state";
const App = () => {
  const { status, data, error } = useQuery("allwebtoon", getAllWebtoon);
  const [allwebtoon, setAllwentoon] = useRecoilState(allwebtoonState);
  console.log(data);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/weekday/:weekday" element={<Weekday />} />
      <Route path="/webtoon/:titleId" element={<Webtoon />} />
    </Routes>
  );
};

export default App;
