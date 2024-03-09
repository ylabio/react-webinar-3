import {useEffect} from 'react';
import Main from "./main";
import Product from './product';
import Basket from "./basket";
import Error from './error';
import {Routes, Route} from "react-router-dom";
import useSelector from "../store/use-selector";
import {useNavigate} from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const navigate = useNavigate();

  const error = useSelector(
    state => state.catalog.error || state.product.error || state.basket.error
  );

  useEffect(() => {
    if(error) navigate('/error');
  }, [error])

  return (
    <>
      <Routes>
        <Route path="/:page?" element={<Main/>} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/error" element={<Error error={error}/>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
