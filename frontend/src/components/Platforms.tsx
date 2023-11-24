import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Platforms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(0);
  const genres = searchParams.getAll("genres");
  const dayOfWeeks = searchParams.getAll("dayOfWeeks");

  const handleTabs = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
    if (newTab === 0) {
      setSearchParams({ genres, dayOfWeeks });
    } else if (newTab === 1) {
      setSearchParams({ genres, dayOfWeeks, platform: "naver" });
    } else if (newTab === 2) {
      setSearchParams({ genres, dayOfWeeks, platform: "kakao" });
    } else if (newTab === 3) {
      setSearchParams({ genres, dayOfWeeks, platform: "lezhin" });
    } else if (newTab === 4) {
      setSearchParams({ genres, dayOfWeeks, platform: "toptoon" });
    } else if (newTab === 5) {
      setSearchParams({ genres, dayOfWeeks, platform: "toomics" });
    }
  };

  return (
    <Tabs value={tab} onChange={handleTabs}>
      <Tab label="전체" />
      <Tab label="네이버" />
      <Tab label="카카오" />
      <Tab label="레진코믹스" />
      <Tab label="탑툰" />
      <Tab label="투믹스" />
    </Tabs>
  );
};

export default Platforms;
