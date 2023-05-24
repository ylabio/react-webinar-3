import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import browserRoutes from "./lib/browserRoutes";
import Main from "./main";
import Product from "./product";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={browserRoutes.home} element={<Main />} />
      <Route path={browserRoutes.product()} element={<Product />} />
    </Routes>
  );
};

export default memo(AppRoutes);
