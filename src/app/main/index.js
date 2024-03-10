import {memo} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home";
import SingleProduct from "../../pages/single-product";

function Main() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:id' element={<SingleProduct/>}/>
    </Routes>
  )
}

export default memo(Main);
