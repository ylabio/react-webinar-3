import {memo, useCallback, useEffect} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import {localization} from '../../localization';

function Main() {

  const store = useStore();
  const limit = 10;

  useEffect(() => {
    store.actions.catalog.loadPage(select.current);
  }, []);

  useEffect(() => {
    store.actions.catalog.loadCount();
  }, [])

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    current: state.catalog.current,
    language: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    switchPage: useCallback((event) => store.actions.catalog.switchPage(event), [store]),
    switchLanguage: useCallback((lang) => store.actions.language.switchLanguage(lang), [store]),
  }

  const renders = {
    item: useCallback((item, language) => {
      return <Item item={item} language={language} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={localization.main.shop[select.language]} switchLanguage={callbacks.switchLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} language={select.language}/>
      <List list={select.list} language={select.language} renderItem={renders.item}/>
      <Pagination count={select.count} limit={limit} current={select.current} onSwitch={callbacks.switchPage}/>
    </PageLayout>
  );
}

export default memo(Main);
