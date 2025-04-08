import { memo, useCallback, useEffect, useMemo } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Select from '../../components/select';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.languages.currentLanguage,
    localText: state.languages.text[state.languages.currentLanguage],
    count: state.catalog.count,
    pageSize: state.catalog.limit,
    activePage: state.catalog.activePage,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLanguage: useCallback(lang => store.actions.languages.setLanguages(lang), [store]),
    changeLimit: useCallback(limit => store.actions.catalog.changeLimit(limit), [store]),
    setActivePage: useCallback(page => store.actions.catalog.load(page), [store]),
    resetToFirstPage: useCallback(() => store.actions.catalog.load()),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            localText={select.localText}
            item={item}
            link={`/product/${item._id}`}
            onAdd={callbacks.addToBasket}
          />
        );
      },
      [callbacks.addToBasket, select.lang],
    ),
  };

  const propSelect = {
    lang: [
      { value: 'ru', title: 'RU' },
      { value: 'en', title: 'EN' },
    ],
    limit: [
      { value: '5', title: '5' },
      { value: '10', title: '10' },
      { value: '15', title: '15' },
      { value: '20', title: '20' },
    ],
  };

  return (
    <PageLayout>
      <Head title={select.localText.titleShop}>
        <Select
          value={select.lang}
          changeSelect={callbacks.changeLanguage}
          propSelect={propSelect.lang}
        />
      </Head>
      <BasketTool
        localText={select.localText}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        resetToFirstPage={callbacks.resetToFirstPage}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        changeSelect={callbacks.changeLimit}
        propSelect={propSelect.limit}
        currentPage={select.activePage}
        totalCount={select.count}
        pageSize={select.pageSize}
        onPageChange={callbacks.setActivePage}
      />
    </PageLayout>
  );
}

export default memo(Main);
