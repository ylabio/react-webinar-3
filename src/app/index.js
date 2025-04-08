import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import ItemPage from './item';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="articles">
          <Route index element={<Main />} />
          <Route path=":id" element={<ItemPage />} />
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
