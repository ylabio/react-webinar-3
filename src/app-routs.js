import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import ModalArticle from "./components/modal-article";

const AppRoutes = ({ store }) => {
  return (
    <Routes>
      <Route path="/" element={<App store={store} />} />
      <Route path="/product/:id" element={<ModalArticle  store={store}/>} />
    </Routes>
  );
};

export default AppRoutes;

