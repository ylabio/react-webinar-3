import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '../language-context';
import ProductPage from './product-page';

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
