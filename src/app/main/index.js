import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../hooks/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import StyledSelector from '../../components/styled-selector';
import './style.css';
import MainMenu from '../../components/main-menu';
import { ROUTES } from '../../constants';
import { useTranslate } from '../../hooks/useTranslate';

function Main() {
  const store = useStore();
  const [productsPerPage, setProductsPerPage] = useState(10);
  const translate = useTranslate();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
    language: state.settings.language,
    dictionary: state.settings.dictionary,
  }));

  useEffect(() => {
    store.actions.catalog.load({
      limit: productsPerPage,
      skip: productsPerPage * (select.currentPage - 1),
      language: select.language,
    });
  }, [select.currentPage, productsPerPage, select.language]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onCloseModal: useCallback(() => store.actions.modals.close(), [store]),
    changeProductsPerPage: setProductsPerPage,
    changePage: useCallback(page => store.actions.catalog.changePage(page), [store]),
    changeLanguage: useCallback(
      language => store.actions.settings.changeLanguage(language),
      [store],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onCloseModal={callbacks.onCloseModal}
            language={select.language}
            title={translate('add')}
          />
        );
      },
      [callbacks.addToBasket, translate, select.language, callbacks.onCloseModal],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate('title')}>
        <StyledSelector
          onChange={callbacks.changeLanguage}
          value={select.language}
          options={select.dictionary}
        />
      </Head>
      <MainMenu to={ROUTES.MAIN} title={translate('home')}>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          cartTitle={translate('emptyCart')}
          pluralForm={translate('item')}
          language={select.language}
        />
      </MainMenu>
      <List list={select.list} renderItem={renders.item} />
      <div className="Wrap">
        <StyledSelector
          onChange={callbacks.changeProductsPerPage}
          value={productsPerPage}
          options={[5, 10, 20]}
          label={translate('productsPerPage')}
        />
        <Pagination
          totalItems={select.totalItems}
          currentPage={select.currentPage}
          limit={productsPerPage}
          onPageChange={callbacks.changePage}
          pageTitle={translate('page')}
        />
      </div>
    </PageLayout>
  );
}

export default memo(Main);
