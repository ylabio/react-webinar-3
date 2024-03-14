import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { UI_TEXTS } from '../../consts/content';
import PageLayout from '../../components/page-layout';
import Menu from '../../components/menu';
import { useSearchParams } from 'react-router-dom';

function Main() {
  const store = useStore();

  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language,
    modalStatus: state.modals.name
  }));

  useEffect(() => {
    const fetchCatalog = async () => {
      const page = searchParams.get('page') || 1
      await store.actions.catalog.load(page, select.language.currentLanguage)
      setIsLoading(false)
    }

    fetchCatalog()
  }, [searchParams.get('page'), select.language.currentLanguage]);



  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handleSelectPage(pageNumber) {
      setPage(pageNumber)
      setIsLoading(true)
    },
    setLanguage: useCallback((language) => {
      store.actions.language.setLanguage(language)
    }, [store]),
  }

  const uiText = {
    title: UI_TEXTS[select.language.currentLanguage].main.head.headTitle,
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} productLink={`/product/${item._id}`} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout modalStatus={select.modalStatus}>
      <Head title={uiText.title} languageState={select.language} onChangeLang={callbacks.setLanguage} />
      <Menu onOpen={callbacks.openModalBasket} amount={select.amount} language={select.language.currentLanguage}
        sum={select.sum} />
      <List list={select.list[select.language.currentLanguage]} renderItem={renders.item} />
      <Pagination
        totalPages={select.totalPages}
      />
    </PageLayout>
  );
}

export default memo(Main);
