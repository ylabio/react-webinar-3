import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
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
    //   children:[
    //      {
    //   path: "/basket",
    //   element:   <Basket/>,
    // },
    //   ]
    },
   
    {
      path: "/product/:productId",
      element: <Product/>,
    },
  
    
   
  ]);
  
  return (
    <>
     
     
<BrowserRouter><Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/product/:productId" element={<Product/>}/>
    </Routes>
     {activeModal === 'basket' && <Basket/>}
</BrowserRouter>
    
 
    </>
  );
}

export default App;
