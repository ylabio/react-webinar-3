import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();
  const [skip, setSkip] = useState(0)
  useEffect(() => {
    store.actions.catalog.getTotalLength()
  }, []);

  useEffect(() => {
    store.actions.catalog.load(skip);
  }, [skip])

  const select = useSelector(state => ({
    list: state.catalog.list,
    length: state.catalog.length,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language
  }));


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setLang: useCallback((lang) => store.actions.language.change(lang), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  const maxPage = Math.ceil(select.length/10)
  return (
    <PageLayout>
      <Head title={select.lang === "ru" ? "Магазин" : "Shop"} selectedLang={select.lang} setLang={callbacks.setLang}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={select.lang} />
      <List list={select.list} renderItem={renders.item}/>
      {maxPage && <Pagination maxPage={maxPage} currentSkip={skip} changePage={setSkip} />}
    </PageLayout>

  );
}

export default memo(Main);
