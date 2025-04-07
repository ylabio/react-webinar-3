import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import ProductPage from './product';
import { LanguageProvider } from '../contexts/language-context';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Главная страница */}
          <Route
            path="/"
            element={
              <>
                <Main />
                {activeModal === 'basket' && <Basket />}
              </>
            }
          />

          {/* Страница товара */}
          <Route
            path="/product/:id"
            element={
              <>
                <ProductPage />
                {activeModal === 'basket' && <Basket />}
              </>
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
