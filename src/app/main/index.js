import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    store.actions.catalog.load(skip, limit);
  }, [skip]);

  const language = useSelector(state => ({
    language: state.language.language,
    mainTextRu: state.language.ru.main,
    mainTextEn: state.language.en.main,
    headTextRu: {...state.language.ru.head, ...state.language.ru.values},
    headTextEn: {...state.language.en.head, ...state.language.en.values},
    itemTextRu: {...state.language.ru.itemPage, ...state.language.ru.values},
    itemTextEn: {...state.language.en.itemPage, ...state.language.en.values},
  }));
  
  const itemText = language.language === "ru" ? language.itemTextRu : language.itemTextEn;
  const headText = language.language === "ru" ? language.headTextRu : language.headTextEn;
  const text = language.language === "ru" ? language.mainTextRu : language.mainTextEn;

  const select = useSelector(state => ({
    list: state.catalog.list,
    listLength: state.catalog.listLength,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} itemText={itemText}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={text.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} basketToolText={headText}/>
      <List list={select.list} listLength={select.listLength} limit={limit} renderItem={renders.item} setSkip={setSkip}/>
    </PageLayout>

  );
}

export default memo(Main);
