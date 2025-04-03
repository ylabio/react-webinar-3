import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './product-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/product-page/:id' element={<ProductPage />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
