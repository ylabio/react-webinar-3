import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
<<<<<<< HEAD
import {useLocation} from "react-router-dom";
=======
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

<<<<<<< HEAD
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);
  const closeModal = useCallback(() => store.actions.modals.close(), [store])

  const {pathname} = useLocation()

  useEffect(() => {
    if (activeModal === 'basket') {
      closeModal()
    }
  }, [pathname]);
=======
  const activeModal = useSelector(state => state.modals.name);
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433

  return (
    <>
      <Main/>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
