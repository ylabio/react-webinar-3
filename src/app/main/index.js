import { memo, useCallback, useContext, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../hooks/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { LanguageContext } from '../../store/context';
import StyledSelector from '../../components/styled-selector';

function Main() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const { setLanguage, translate, language } = useContext(LanguageContext);

  useEffect(() => {
    store.actions.catalog.load({
      limit: productsPerPage,
      skip: productsPerPage * (currentPage - 1),
    });
  }, [currentPage, productsPerPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalItems,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeProductsPerPage: setProductsPerPage,
    changePage: setCurrentPage,
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout
      head={<StyledSelector onChange={setLanguage} value={language} options={['en', 'ru']} />}
    >
      <Head title={translate('title')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <StyledSelector
        onChange={callbacks.changeProductsPerPage}
        value={productsPerPage}
        options={[5, 10, 20]}
        label={translate('productsPerPage')}
      />
      <Pagination
        totalItems={select.totalItems}
        currentPage={currentPage}
        limit={productsPerPage}
        onPageChange={callbacks.changePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
