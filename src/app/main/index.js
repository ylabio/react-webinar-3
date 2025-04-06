import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Controls from '../../components/controls';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../store/use-language';
import translations from '../../locales/index';


function Main() {
  const store = useStore();
  const { language } = useLanguage();

  useEffect(() => {
    store.actions.catalog.loadPage();
    store.actions.pagination.setTotalPages();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pageInfo: state.pagination,
  }));

  useEffect(() => {
    const { limit, currentPage } = select.pageInfo;
    const skip = limit * (currentPage - 1);
    store.actions.catalog.loadPage(limit, skip);
  }, [select.pageInfo.currentPage, select.pageInfo.limit]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение текущей страницы
    onChangePage: useCallback(item => store.actions.pagination.onChangePage(item), [store]),
    //Изменение количества данных на странице
    onChangeLimit: useCallback(newLimit => store.actions.pagination.onChangeLimit(newLimit), [store]),
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
    <PageLayout>
      <Head title={translations[language].shopTitle} />
      <Controls>
        <Link to="/">{translations[language].main}</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </Controls>
      <List list={select.list} renderItem={renders.item} />
      <Pagination 
        pageInfo={select.pageInfo}
        onChangePage={callbacks.onChangePage}
        onChangeLimit={callbacks.onChangeLimit}
      />
    </PageLayout>
  );
}

export default memo(Main);
