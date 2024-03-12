import {
  Route, 
  Routes,
  BrowserRouter} from 'react-router-dom';
import useSelector from '../store/use-selector';
import ProductItem from './product-item';
import Main from './main';
import Basket from './basket';
import NotFound from '../components/not-found';

export function App() {
  const activeModal = useSelector(state => state.modals.name); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="items/:itemId" element={<ProductItem />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default App;
