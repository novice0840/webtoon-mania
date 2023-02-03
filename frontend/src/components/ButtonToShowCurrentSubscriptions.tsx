import React from "react";
import { useGetRecoilValueInfo_UNSTABLE, useRecoilState } from "recoil";
import { allwebtoonState } from "recoil/state";

function ButtonToShowCurrentSubscriptions() {
  const getRecoilValueInfo = useGetRecoilValueInfo_UNSTABLE();
  const [allwebtoon, setAllwebtoon] = useRecoilState(allwebtoonState);
  function onClick() {
    console.log(allwebtoon);
    const { subscribers } = getRecoilValueInfo(allwebtoonState);
    console.debug(
      "Current Subscriber Nodes:",
      Array.from(subscribers.nodes).map(({ key }) => key),
    );
  }

  return <button onClick={onClick}>See Current Subscribers</button>;
}

export default ButtonToShowCurrentSubscriptions;
