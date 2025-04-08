import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PaginationPage from '../../components/pagination-page';
import ItemsPerPageSelector from '../../components/items-per-page-selector';
import { useLanguage } from '../../language-context';
import translations from '../../locales';
import LanguageToggle from '../../components/language-toggle';
import HomeLink from '../../components/home-link';
import Flex from '../../components/flex';

function Main() {
  const store = useStore();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const page = store.getState().pagination.currentPage || 1;
    store.actions.pagination.loadPage(page);
  }, [store]);

  const select = useSelector(state => ({
    list: state.pagination.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.pagination.currentPage,
    totalCount: state.pagination.totalCount,
    perPage: state.pagination.perPage
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangePage: useCallback(page => store.actions.pagination.loadPage(page), [store]),
    onChangePerPage: useCallback(newPerPage => {
      store.setState({
        ...store.getState(),
        pagination: {
          ...store.getState().pagination,
          perPage: newPerPage
        }
      });
      store.actions.pagination.loadPage(select.currentPage);
    }, [store, select.currentPage]),
    toggleLanguage
  };

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} path={`/product/${item._id}`}/>,
      [callbacks.addToBasket]
    ),
  };

  const totalPages = Math.ceil(select.totalCount / select.perPage);

  return (
    <PageLayout>
      <Head title={t.shop}><LanguageToggle/></Head>
      <Flex>
      <HomeLink resetPagination={true}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}/>
      </Flex>
      <List list={select.list} renderItem={renders.item} />
      <ItemsPerPageSelector
        perPage={select.perPage}
        onChange={callbacks.onChangePerPage}
        label={t.itemsPerPage}
      >
      {totalPages > 1 && (
        <PaginationPage
          currentPage={select.currentPage}
          totalPages={totalPages}
          onChangePage={callbacks.onChangePage}
        />
      )}</ItemsPerPageSelector>
    </PageLayout>
  );
}

export default memo(Main);
