import { useEffect} from 'react';
import Main from './main';
import Basket from './basket';
import ProductPage from './product-page';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import useSelector from '../store/use-selector';

/**
 * Приложение
 * @returns {React.ReactElement}
 */

const RedirectToDefault = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/page/10/1');
  }, [navigate]);

  return null; 
};


function App() {
  const activeModal = useSelector(state => state.modals.name);

  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/page/:limit/:pageNumber/" element={<Main/>} />
        <Route path="/" element={<RedirectToDefault />} />
        <Route path="/product/:id" element={<ProductPage/>} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </Router>
 
    </>
  );
}

export default App;
