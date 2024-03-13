import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import MainMenu from '../../components/main-menu';
import Row from '../../components/row';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.product.clear();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.i18n.lang,
    languageNames: state.i18n.languageNames,
    locale: state.i18n.locale
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение страницы
    changePage: useCallback(page => store.actions.catalog.load(page), [store]),
    // Переключение языка
    changeLang: useCallback((e) => store.actions.i18n.changeLocale(e.target.value), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} addBtnTitle={select.locale.Add} />
    }, [callbacks.addToBasket, select.locale]),
  };

  return (
    <PageLayout
      head={<>
        <Head
          title={select.locale.Shop}
          lang={select.lang}
          languageNames={select.languageNames}
          changeLang={callbacks.changeLang}
        />
        <Row>
          <MainMenu title={select.locale.Main} />
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            locale={{
              Main: select.locale.Main,
              In_cart: select.locale.In_cart,
              product: select.locale.product,
              empty: select.locale.empty,
              Navigate: select.locale.Navigate
            }}
          />
        </Row>
      </>}
    >
      <List
        list={select.list}
        renderItem={renders.item}
      />
      <Pagination
        count={select.count}
        currentPage={select.currentPage}
        onPageChange={callbacks.changePage}
      />
    </PageLayout>

  );
}

export default memo(Main);
