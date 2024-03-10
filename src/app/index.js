import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router";
import pageLayout from '../components/page-layout';
import ItemPage from '../pages/item-page';
import PageLayout from '../components/page-layout';
import HomePage from '../pages/home-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/items' element={<HomePage />} />
          <Route path='/items/:id' element={<ItemPage />} />
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
