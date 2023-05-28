import {useCallback, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import Product from './product';
import DetectLocation from './detect-location';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
        {activeModal === 'basket' && <Basket/>}
        <DetectLocation/>
      </BrowserRouter>
    </>
  );
}

export default App;
