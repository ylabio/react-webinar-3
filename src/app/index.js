import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Main from './main';
import Basket from './basket';
import ProductPage from './product-page';
import useSelector from "../store/use-selector";

function App() {
  const activeModal = useSelector(state => state.modals.name);
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:productId" element={<ProductPage />} /> 
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
