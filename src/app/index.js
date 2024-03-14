import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Routes, Route} from 'react-router';
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
        <Route path="/" element={<Main />} />
        <Route path="/:page" element={<Main />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
