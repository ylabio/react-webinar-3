import {useCallback, useContext, useEffect, useState} from 'react';
import Home from "./home";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Route, Routes } from 'react-router-dom';
import PageLayout from '../components/page-layout';
import ItemPage from './itemPage';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
      {/*
      * ----- Главная страница (path = "/")
      */}
      <Route path="/" element={<Home/>}/>
      {/*
      * ----- Информация о товаре (path = "articles/id")
      */}
      <Route path="articles/:id" element={<ItemPage/>}/>
    </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
