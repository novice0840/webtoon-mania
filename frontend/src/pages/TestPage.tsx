import React, { useState, useEffect } from "react";
import { Snackbars } from "@src/components";

const TestPage = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(1);
    setCount(2);
    setCount(3);
  };
  return <Snackbars />;
};

export default TestPage;
