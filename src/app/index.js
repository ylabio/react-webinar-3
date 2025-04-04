import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import Article from './article';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { BrowserRouter, Routes, Route } from "react-router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
