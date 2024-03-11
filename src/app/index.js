import Main from "./main";
import Basket from "./basket";
import SingleArticle from './singleArticle';
import ErrorPage from './errorPage';
import useSelector from "../store/use-selector";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Main/>}/>
            <Route path=':articleId' element={<SingleArticle/>}/>
            <Route path='*' element={<ErrorPage/>}/>
         </Route>
        </Routes>
        {activeModal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default App;
