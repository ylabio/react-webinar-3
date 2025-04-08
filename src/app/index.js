import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App({ children }) {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      { children }
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
