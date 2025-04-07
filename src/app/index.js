import { memo, useCallback, useEffect } from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import useStore from '../store/use-store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './product-page';
import PageLayout from '../components/page-layout';
import Head from '../components/head';
import MainMenu from '../components/main-menu';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const headerTitle = useSelector(state => state.ui.headerTitle);

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount || 0,
    sum: state.basket.sum || 0,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <Router>
      <PageLayout head={<Head title={headerTitle} />}>
        <MainMenu
          onOpenBasket={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </PageLayout>
    </Router>
  );
}

export default App;
