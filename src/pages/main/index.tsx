import React from "react";
import { RecoilRoot } from "recoil";
import TodoList from "components/TodoList";
const main = () => {
  return (
    <div className="App">
      <h1>Hello Recoil</h1>
      <h2>Start learning using this ToDo List example</h2>
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
};

export default main;
