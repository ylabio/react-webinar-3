import { Routes, Route, Navigate } from "react-router";
import Main from './main';
import Basket from './basket';
import AppLayout from '../components/app-layout';
import useSelector from '../store/use-selector';
import Product from '../product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        <Route element={<AppLayout />}>
          <Route 
            path="/page/:currentPage" 
            element={
              <>
                <Main />
                {activeModal === 'basket' && <Basket />}
              </>
            } 
          />
          <Route
            path="/product/:_id" 
            element={
              <>
                <Product />
                {activeModal === 'basket' && <Basket />}
              </>
            } 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;