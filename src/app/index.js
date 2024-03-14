import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      {activeModal === 'basket' && <Basket/>}
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/items/:id' element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
