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

  const language = useSelector(state => state.catalog.language);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="" element={<Main language={language}/>}></Route>
          <Route path="articles/:articleId" element={<ArticlesPage language={language}/>} />
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket language={language}/>}
    </>
  );
}

export default App;
