import React from "react";
import { Tabs, Tab } from "@mui/material";
import { PlatformKind } from "@src/types";

type PropTypes = {
  platform: PlatformKind;
  handlePlatform: (event: React.SyntheticEvent, value: PlatformKind) => void;
};

const Platforms = ({ platform, handlePlatform }: PropTypes) => {
  return (
    <Tabs value={platform} onChange={handlePlatform} aria-label="webtoon platform tabs">
      <Tab label="전체" value="all" />
      <Tab label="네이버" value="naver" />
      <Tab label="카카오" value="kakao" />
      <Tab label="레진코믹스" value="lezhin" />
      <Tab label="탑툰" value="toptoon" />
      <Tab label="투믹스" value="toomics" />
    </Tabs>
  );
};

export default Platforms;
