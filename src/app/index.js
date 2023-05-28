import {useCallback, useContext, useEffect, useState} from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import {Route, Routes} from 'react-router-dom';
import ItemPage from './item-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      {activeModal === 'basket' && <Basket />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="articles/:id" element={<ItemPage />} />
      </Routes>
    </>
  );
}

export default App;
