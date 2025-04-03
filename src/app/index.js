import Main from './main';
import Basket from './basket';
import Article from './article';
import useSelector from '../store/use-selector';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../components/not-found';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (

    <>
    <Routes>
     <Route path="" element={<Main />} />
     <Route path="a" element={<Article />} />
     <Route path="*" element={<NotFound />} />
     </Routes>
      {activeModal === 'basket' && <Basket />}

    </>

  );
}

export default App;
