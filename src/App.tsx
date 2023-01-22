import { Route, Routes } from "react-router-dom";
import Main from "pages/Main";
import Weekday from "pages/Weekday";
import Webtoon from "pages/Webtoon";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/weekday" element={<Weekday />} />
      <Route path="/webtoon" element={<Webtoon />} />
    </Routes>
  );
};

export default App;
