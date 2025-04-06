import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import ItemCard from './ItemCard'; // Импортируем компонент карточки товара
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/items/:id" element={<ItemCard />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
