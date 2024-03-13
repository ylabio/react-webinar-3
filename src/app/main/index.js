import { memo, useCallback, useEffect, useMemo } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Navigation from '../../components/navigation';
import { useParams } from "react-router-dom";
import ruTranslations from '../../translations/ru.json';
import enTranslations from '../../translations/en.json';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    lang: state.language.lang
  }));

  const params = useParams();

  useEffect(() => {
    const page = Number(params.id) || 1;
    store.actions.catalog.load({ page: page, lang: select.lang });
  }, [select.lang, params]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Пагинация
    goToPage: useCallback(page => store.actions.catalog.load({ page }), [store]),
    switchLanguage: useCallback(lang => store.actions.language.switch(lang), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item lang={select.lang} item={item} onAdd={callbacks.addToBasket} link={`/products/${item._id}`} />
    }, [callbacks.addToBasket, select.lang]),
  };

  const language = select.lang === 'ru' ? ruTranslations : enTranslations;

  return (
    <PageLayout>
      <Head title={language.title} link='/' onClick={callbacks.switchLanguage} lang={select.lang} />
      <Navigation onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        page={select.page}
        count={select.count}
        limit={select.limit}
        range={1}
        onChange={callbacks.goToPage} />
    </PageLayout>
  );
}

export default memo(Main);
