import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import ArticleMain from "./article";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/:lang/article/:id" element={
        <>
          <ArticleMain />
          {activeModal === 'basket' && <Basket/>}
        </>}/>
        <Route path="/:lang/" element={<>
          <Main/>
          {activeModal === 'basket' && <Basket/>}
        </>}/>
      </Routes>
    </Router>
  );
}

export default App;
