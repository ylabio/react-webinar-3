import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home";
import SingleProduct from "../../pages/single-product";

function Main() {
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<SingleProduct/>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
