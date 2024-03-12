import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom';
import ArticlesPage from './articles-page';
import useStore from '../store/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);
  const language = useSelector(({ translation }) => {
    const currLang = localStorage.getItem('language');
    if (currLang) {
      return currLang;
    }
    return translation.language;
  });


  return (
    <>
      <Routes>
        <Route path="/">
          <Route path=":page?" element={<Main language={language} />}></Route>
          <Route
            path="articles/:articleId"
            element={<ArticlesPage language={language} />}
          />
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket language={language} />}
    </>
  );
}

export default App;
