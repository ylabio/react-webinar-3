import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useSelector from "../store/use-selector";
import Article from './article';
import Basket from "./basket";
import Main from "./main";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='article/:id' element={<Article />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
