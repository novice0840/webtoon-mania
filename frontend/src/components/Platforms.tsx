import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Platforms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const platform = searchParams.get("platform");

  const platformConverter = (platform: string | null) => {
    if (platform === "naver") {
      return 1;
    } else if (platform === "kakao") {
      return 2;
    } else if (platform === "lezhin") {
      return 3;
    } else if (platform === "toptoon") {
      return 4;
    } else if (platform === "toomics") {
      return 5;
    } else {
      return 0;
    }
  };

  const [tab, setTab] = useState(platformConverter(platform));
  const genres = searchParams.getAll("genres");
  const dayOfWeeks = searchParams.getAll("dayOfWeeks");
  const isEnd = searchParams.get("isEnd");

  const handleTabs = (event: React.SyntheticEvent, newTab: number) => {
    let newParams = {};

    if (isEnd) {
      newParams = { ...newParams, isEnd };
    }

    if (newTab === 0) {
      setTab(0);
      newParams = { ...newParams, genres, dayOfWeeks };
    } else if (newTab === 1) {
      setTab(1);
      newParams = { ...newParams, genres, dayOfWeeks, platform: "naver" };
    } else if (newTab === 2) {
      setTab(2);
      newParams = { ...newParams, genres, dayOfWeeks, platform: "kakao" };
    } else if (newTab === 3) {
      setTab(3);
      newParams = { ...newParams, genres, dayOfWeeks, platform: "lezhin" };
    } else if (newTab === 4) {
      setTab(4);
      newParams = { ...newParams, genres, dayOfWeeks, platform: "toptoon" };
    } else if (newTab === 5) {
      setTab(5);
      newParams = { ...newParams, genres, dayOfWeeks, platform: "toomics" };
    }

    setSearchParams(newParams);
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
