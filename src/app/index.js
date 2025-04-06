import Main from './main';
import Basket from './basket';

import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { useCallback, useEffect, useMemo } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './product-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const { basket, modals, catalog } = store.actions;
  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(id => basket.addToBasket(id), [basket]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => modals.open('basket'), [modals]),
    // Переход на главную страницу
    backLinkClick: useCallback(() => catalog.setPage(1), [catalog]),
  };

  useEffect(() => {
    catalog.load();
  }, [catalog]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element=
          {
            <Main
              openModalBasket={callbacks.openModalBasket}
              onLinkClick={callbacks.backLinkClick}
              addToBasket={callbacks.addToBasket}
              amount={select.amount}
              sum={select.sum}
              list={select.list}
            />
          }
        />
        <Route path='/product-page/:id' element=
          {
            <ProductPage
              catalog={catalog}
              onLickClick={callbacks.backLinkClick}
              openModalBasket={callbacks.openModalBasket}
              addToBasket={callbacks.addToBasket}
              amount={select.amount}
              sum={select.sum}
            />
          }
        />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
