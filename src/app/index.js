import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom';
import Product from './product';
import Head from '../components/head';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const headerTitle = useSelector(state => state.ui.headerTitle);

  return (
    <>
      <Head title={headerTitle} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles/:id" element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
