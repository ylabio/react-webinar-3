import Main from "./main";
import Basket from "./basket";
import Product from "./product";
import useSelector from "../store/use-selector";
import {Route, Routes, Navigate} from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route
          path={"/"}
          element={<Main/>}
        />
        <Route
          path="/item/:itemId"
          element={<Product/>}
        />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
