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
import './style.css';
import MainMenu from '../../components/main-menu';
import { ROUTES } from '../../constants';

function Main() {
  const store = useStore();
  const [productsPerPage, setProductsPerPage] = useState(10);
  const { setLanguage, translate, language } = useContext(LanguageContext);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
  }));

  useEffect(() => {
    store.actions.catalog.load({
      limit: productsPerPage,
      skip: productsPerPage * (select.currentPage - 1),
      language,
    });
  }, [select.currentPage, productsPerPage, language]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onCloseModal: useCallback(() => store.actions.modals.close(), [store]),
    changeProductsPerPage: setProductsPerPage,
    changePage: useCallback(page => store.actions.catalog.changePage(page), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item item={item} onAdd={callbacks.addToBasket} onCloseModal={callbacks.onCloseModal} />
        );
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate('title')}>
        <StyledSelector onChange={setLanguage} value={language} options={['en', 'ru']} />
      </Head>
      <MainMenu to={ROUTES.MAIN} title={translate('home')}>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
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
        />
      </div>
    </PageLayout>
  );
}

export default memo(Main);
