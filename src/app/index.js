import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Card from "./card";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const [item, setItem] = React.useState([]);

  return (
    <Routes>
      <Route path="/" element={<Main setItem={setItem} />} />
      <Route path="/card" element={<Card item={item} />} />
      <Route path="/basket" element={<Basket />} />
    </Routes>
  );
}

export default App;
