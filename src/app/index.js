import { useCallback, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import DetailsCart from "../components/detail-scart";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/details/:id" element={<DetailsCart />} />
        </Routes>
        {activeModal === "basket" && <Basket />}
      </Router>
    </>
  );
}

export default App;
