import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* <Route
          path="/basket"
          element={
            activeModal === "basket" && <Basket /> && (
              <Navigate to="/basket" replace={true} />
            )
          }
        /> */}
        {/* <Route path="/" element={<Navigate to="dashboard" />} /> */}
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
