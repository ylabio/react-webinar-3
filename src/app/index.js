import {useCallback, useContext, useEffect, useState} from "react";
import Main from "./main";
import NotFound from "./notFound";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Main />
              {activeModal === "basket" && <Basket />}
            </>
          }
        />
        <Route path="product/:id" element={
          <>
            <Product/>
            {activeModal === "basket" && <Basket />}
          </>
        } />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </>
  );
}

export default App;
