import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useNavigate } from 'react-router';
import { langKeyWords } from '../../utils/lang';

function Main() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
    productsPerPage: state.catalog.productsPerPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.lang]);

  useEffect(() => {
    store.actions.catalog.getProductCount();
  })

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переход на страницу продукта
    navToProductPage: useCallback(_id => navigate(`/product/${_id}`), [navigate, store]),
    // Количество товаров на одной странице
    setProductsPerPage: useCallback(newProductsPerPage => {
      store.actions.catalog.setProductsPerPage(newProductsPerPage);
      store.actions.catalog.load({
        productsPerPage: newProductsPerPage,
        currentPage: 1,
      })
    }, [store, select.productsPerPage]),
    pageChange: useCallback(newPage => {
      store.actions.catalog.load({
        currentPage: newPage,
        productsPerPage: select.productsPerPage,
      });
    }, [store, select.productsPerPage])
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} lang={select.lang} onAdd={callbacks.addToBasket} onNavigate={callbacks.navToProductPage} />;
      },
      [callbacks.addToBasket, callbacks.navToProductPage, select.lang],
    ),
  };

  const multi = langKeyWords[select.lang] || lang.ru;

  return (
    <PageLayout>
      <Head title={multi.headTitle} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        productCount={select.count}
        currentPage={select.currentPage}
        productsPerPage={select.productsPerPage}
        onPageChange={callbacks.pageChange}
        onDisplayProducts={callbacks.setProductsPerPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
