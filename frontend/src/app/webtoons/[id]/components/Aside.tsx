import React from "react";
import Image from "next/image";
import WebtoonMini from "./WebtoonMini";

const Aside = () => {
  return (
    <aside className="hidden w-64 lg:block">
      <div>이 작가의 또 다른 작품 </div>
      <ul>
        <li>
          <WebtoonMini />
        </li>
        <li>
          <WebtoonMini />
        </li>
        <li>
          <WebtoonMini />
        </li>
        <li>
          <WebtoonMini />
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
