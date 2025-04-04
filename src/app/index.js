import { useEffect } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { Routes, Route } from 'react-router-dom';
import Product from '../components/product';
import { useLocation } from 'react-router-dom';


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  const location = useLocation(); // 🔍 получаем текущий путь

  // Закрываем модалку при смене маршрута
  useEffect(() => {
    if (activeModal === 'basket') {
      store.actions.modals.close();
    }
  }, [location.pathname]);

  return (
    <>
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='/product/:id' element={<Product />}/>
    </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
