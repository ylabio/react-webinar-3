import Main from "./main";
import Basket from "./basket";
import { Routes, Route, useLocation } from 'react-router-dom';
import ProductPage from './product-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' index element={<Main />} />
        <Route path=':id' element={<ProductPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path='/basket' element={<Basket />} />
        </Routes>
      )}
    </>
  );
}

export default App;
