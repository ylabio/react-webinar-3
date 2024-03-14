import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./product-page";
import ErrorPage from "../components/error";

function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
                                  <Main/>
                                  {activeModal === 'basket' && <Basket/>}
                                </>}/>
        <Route path="/articles/:productId" element={<>
                                                      <ProductPage/>
                                                      {activeModal === 'basket' && <Basket/>}
                                                    </>}/>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;