import useSelector from "../store/use-selector";
import Basket from "./basket";
import { Route, Routes } from "react-router";
import Product from "./product";
import NotFound from "./not-found";
import Main from "./main";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
