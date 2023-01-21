import * as React from "react";
import { AppProvider } from "./context";
import Products from "./Products";
import List from "./List";

export default function App() {
  return (
    <AppProvider>
      <Products />
      <List />
    </AppProvider>
  );
}
