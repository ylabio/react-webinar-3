import { Route, Routes } from 'react-router';
import Basket from './basket';
import useSelector from '../store/use-selector';
import Main from './main';
import Article from './article';

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
        <Route path="/page/:pageNumber" element={<Main />} />
        <Route path="/article/:itemId" element={<Article />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
