import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Article from '../components/article/index.js';
import useSelector from '../store/use-selector';
import Layout from './layout.js';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout activeModal={activeModal} />}>
          <Route index element={<Main />} />
          <Route path="product/:id" element={<Article />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
