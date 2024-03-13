import { Route, Routes } from 'react-router-dom'
import ArticlePage from './articlePage'
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import NotFound from './notFound'

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Routes>
      <Route path={'/'} element={
        <>
          <Main/>
          {activeModal === 'basket' && <Basket/>}
        </>
      } />
      <Route path={'/articles/:id'} element={
        <>
          <ArticlePage />
          {activeModal === 'basket' && <Basket/>}
        </>
      } />
      <Route path={'*'} element={<NotFound />} />
    </Routes>

  );
}

export default App;
