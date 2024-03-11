import { Routes, Route, Navigate } from "react-router";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate replace to="/1" />}/>
      <Route path="/:page" element={<Main/>} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
    {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
