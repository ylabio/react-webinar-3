import {useCallback, useContext, useEffect, useState} from 'react';
import Main from './main';
import Basket from './basket';
import Card from './card';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom'

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>} />
        <Route path={'/:page'} element={<Main />} />
        <Route path={'card/:id'} element={<Card />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
