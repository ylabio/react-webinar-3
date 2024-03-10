import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom';
import ArticlesPage from './articles-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="" element={<Main />}></Route>
          <Route path="articles/:articleId" element={<ArticlesPage />} />
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
