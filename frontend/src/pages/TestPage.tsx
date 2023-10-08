import React, { useState, useEffect } from "react";

const TestPage = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(1);
    setCount(2);
    setCount(3);
  };
  return (
    <div>
      <span>{count}</span>
      <button onClick={handleClick}>증가</button>
    </div>
  );
};

export default TestPage;
