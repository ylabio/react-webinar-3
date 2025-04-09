import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router';
import Product from './product';
import { PAGE_PATH } from '../constants';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route index element={<Main />} />
        <Route path={`${PAGE_PATH.PRODUCT_PAGE}:productId`} element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
