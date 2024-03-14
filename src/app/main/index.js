import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import LangTool from '../../components/lang-tool';
import {locale} from '../../locale';
import {setLocale} from '../../utils';
import Loader from '../../components/loader';
import Navigation from '../../components/navigation';
import {useParams} from 'react-router-dom';

function Main({lang, setLang}) {
  const [isLoading, setIsLoading] = useState(true);
  const {page} = useParams();

  const store = useStore();

  useEffect(() => {
    if (page) {
      setIsLoading(true);
      store.actions.catalog.setCurrentPage(Number(page))
    }
    store.actions.catalog.load()
      .then(() => setIsLoading(false))
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    lastPage: state.catalog.lastPage
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Обновление текущего товара
    setItemPage: useCallback(_id => store.actions.catalog.setCurrentItem(_id), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} lang={lang} link={`/item/${item._id}`}
        onAdd={callbacks.addToBasket} 
        onFollowing={callbacks.setItemPage} />
    }, [callbacks.addToBasket, lang]),
  };

  return (
    <PageLayout>
      <Head title={locale[lang].head.shop}>
        <LangTool setLocale={setLocale} setLang={setLang}/>
      </Head>
      <BasketTool lang={lang} 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount}
        sum={select.sum}>
        <Navigation link='/page/1' title={locale[lang].tool.main} />
      </BasketTool>
      <Loader isLoading={isLoading}>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination isLoading={isLoading} 
          currentPage={select.currentPage}
          lastPage={select.lastPage} />
      </Loader>
    </PageLayout>

  );
}

export default memo(Main);
