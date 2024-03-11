import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { locale } from '../../locale';

function Main({lang, setLang}) {
  const [buttonWorks, setButtonWorks] = useState(true);

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.pagination.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.pagination.currentPage,
    lastPage: state.pagination.lastPage
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена текущей страницы, загрузка следующей страницы товаров
    setCurrentPage: useCallback((page) => {
      setButtonWorks(false);
      store.actions.pagination.setCurrentPage(page);
      store.actions.catalog.setNewList(page)
      .then(() => setButtonWorks(true));
    }, [store]),
    // Обновление текущего товара
    setItemPage: useCallback(_id => store.actions.catalog.setCurrentItem(_id), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} lang={lang}
      onAdd={callbacks.addToBasket} 
      onFollowing={callbacks.setItemPage} />
    }, [callbacks.addToBasket, lang]),
  };

  return (
    <PageLayout>
      <Head title={locale[lang].head.shop} onChange={setLang}>
        <button onClick={() => setLang('ru')}>ru</button>
        <button onClick={() => setLang('eng')}>eng</button>
      </Head>
      <BasketTool lang={lang} onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination buttonWorks={buttonWorks} currentPage={select.currentPage}
        lastPage={select.lastPage}
        onClick={callbacks.setCurrentPage}
      />
    </PageLayout>

  );
}

export default memo(Main);
