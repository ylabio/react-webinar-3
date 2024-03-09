import {useCallback, useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import DetailedPageContainer from "./detailed-page";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/:id" element={<DetailedPageContainer />} /> 
      </Routes>
     {activeModal === 'basket' && <Basket/>}
    </Router>
  );
}

export default App;
