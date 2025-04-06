import { Route, Routes } from 'react-router';
import useSelector from '../store/use-selector';
import Basket from './basket';
import ItemPage from './item-page';
import Main from './main';

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
        <Route path="items/:itemId" element={<ItemPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
