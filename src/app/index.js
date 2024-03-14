import Main from "./main";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSelector from "../store/use-selector";
import Basket from "./basket";
import ErrorPage from "../components/error-page";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/page/:page' element={<Main />}/>
        <Route path='/articles/:productId' element={<Product />}/>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default App;
