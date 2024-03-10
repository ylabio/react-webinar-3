import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import CardFull from './item-full';
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Route, Routes } from "react-router-dom";
import { LanguageProvider } from '../store/language-context';
import LanguageSwitcher from '../components/language-switcher';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <LanguageProvider defaultLanguage="ru">
        <LanguageSwitcher/>
        <Routes>
          <Route path={'/'} element={<Main/>}/>
          <Route path={'/card/:id'} element={<CardFull/>}/>
        </Routes>
        {activeModal === 'basket' && <Basket/>}
      </LanguageProvider>
    </>
  );
}

export default App;
