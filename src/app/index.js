import useSelector from "../store/use-selector";
import { Routes, Route } from "react-router-dom";
import Basket from "./basket";
import Main from "./main";
import ProductPage from "./product-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
