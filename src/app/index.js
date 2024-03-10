import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {useLocation} from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);
  const closeModal = useCallback(() => store.actions.modals.close(), [store])

  const {pathname} = useLocation()

  useEffect(() => {
    if (activeModal === 'basket') {
      closeModal()
    }
  }, [pathname]);

  return (
    <>
      <Main/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
