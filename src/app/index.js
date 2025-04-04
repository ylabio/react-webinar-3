// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import ItemDetail from './item-detail';
import NotFound from '../components/not-found';
import { LanguageProvider } from '../components/language-provider';
import useSelector from '../store/use-selector';
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/articles/:id" element={<ItemDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
