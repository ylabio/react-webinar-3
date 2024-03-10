import {Navigate, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {ErrorPage} from "../pages/error-page";
import MainPage from "../pages/main-page";
import ProductPage from "../pages/product-page";
import {useEffect, useState} from "react";


/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {



  return (
    <>
      <Routes>
        <Route path={'/'} element={<Navigate to={`/main`}/>}/>
        <Route path={'/main'} element={<MainPage/>}/>

        <Route path={`/product-page/:_Id`} element={<ProductPage/>}/>

        <Route path={'/*'} element={<ErrorPage/>}/>
      </Routes>
    </>

  );
}

export default App;
