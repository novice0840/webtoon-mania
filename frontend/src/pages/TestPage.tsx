import React, { useState, useEffect } from "react";
import { CustomSnackbar } from "@src/components";

const TestPage = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(1);
    setCount(2);
    setCount(3);
  };
  return <CustomSnackbar />;
};

export default TestPage;
