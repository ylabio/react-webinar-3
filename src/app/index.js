import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Product from './product';
import { useTranslate } from '../translate';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
const {setLanguage}=useTranslate()

  const activeModal = useSelector(state => state.modals.name);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
         {
      path: "/basket",
      element:   <Basket/>,
    },
      ]
    },
   
    {
      path: "/product/:productId",
      element: <Product/>,
    },
  ]);
  
  return (
    <>
      <RouterProvider router={router} />
      {/* {activeModal === 'basket' && <Basket/>} */}
      <div style={{display:'flex',justifyContent:'center',gap:'10px',padding:'15px',cursor:'pointer',color:'#0087E9'}}>
        <div onClick={()=>setLanguage('ru-RU')}>RU</div><div onClick={()=>setLanguage('en-EN')}>EN</div></div>
    </>
  );
}

export default App;
