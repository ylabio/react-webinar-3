import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Routes, Route} from 'react-router';
import AboutPage from './about-page';
import LayoutCart from './layout-cart';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const select = useSelector(state => ({
    activeModal: state.modals.name
  }));

  return (
    <>
      <LayoutCart>
        <Routes>
          <Route path='/:id?' element={<Main />} />
          <Route path='/about/:id' element={<AboutPage />} />
        </Routes>
      </LayoutCart>
      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
