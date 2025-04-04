import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom';
import ProductPage from '../components/product-page';
import { LanguageProvider } from '../language-context';

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <LanguageProvider>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/product/:id' element={<ProductPage/>} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </LanguageProvider>
  );
}

export default App;
