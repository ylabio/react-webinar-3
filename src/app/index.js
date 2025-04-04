import Main from './main';
import Basket from './basket';
import Article from './article';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router';

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
        <Route path="/:id" element={<Article />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
