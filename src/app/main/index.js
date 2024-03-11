import {memo, useCallback, useEffect, useState, useMemo} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination"

function Main() {

  const store = useStore();
  const PageSize = 10
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.actions.item.setLoading(true);
    store.actions.catalog.load(PageSize, (currentPage - 1) * PageSize);
  }, [currentPage]);
  
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItemsCount: state.catalog.totalItemsCount,
    t: state.i18n.translations[state.i18n.lang],
    currentLang: state.i18n.lang,
    supportedLangs: state.i18n.supportedLangs
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onLangeChange: useCallback((e) => {
      return store.actions.i18n.setLang(e.target.value)
    }, [store])
  }

  const renders = {
    item: (item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} t={select.t}/>
    },
  };

  return (
    <PageLayout>
      <Head
        title={select.t.shopName}
        lang={select.currentLang}
        supportedLangs={select.supportedLangs}
        onLangChange={callbacks.onLangeChange}
      />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} t={select.t}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        currentPage={currentPage}
        totalCount={select.totalItemsCount}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </PageLayout>
  );
}

export default memo(Main);
