import { useCallback, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import routes from "../store/routes";

import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

import Main from "./main";
import Basket from "./basket";

import PageProduct from "./page-product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state =>
    state.modals.name
  );
  const currentPage = useSelector(state =>
    state.catalog.currentPage
  )

  return (
    <BrowserRouter>
      {activeModal === 'basket' && <Basket />}
      <Routes>
        <Route
          path={routes.main()}
          element={<Main />}
        />
        <Route
          path={routes.product(currentPage)}
          element={
          <PageProduct />
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;