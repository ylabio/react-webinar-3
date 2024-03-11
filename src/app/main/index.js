import { memo, useCallback, useEffect, useMemo } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import BreadCrumbs from "../../components/bread-crumbs";
import { menuPoints } from "../../utils";
import CrumbsContainer from "../../components/crumbs-container";
import Pagination from "../../components/pagination";
import Loading from "../../components/loading";
import SelectLanguage from "../../components/select-language";
import translate from "../../translation/translation";
import { useParams } from "react-router-dom";


function Main() {

  const store = useStore();

  const params = useParams();

  useEffect(() => {
    const par = Number(params.id) || 1;
    store.actions.catalog.getCatalog(par);
  }, [params]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    limit: state.catalog.limit,
    page: state.catalog.page,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangePage: useCallback(page => store.actions.catalog.getCatalog(page), [store]),
    onChangeLanguage: useCallback(lang => store.actions.language.setLanguage(lang), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} link={`/card/${item._id}`} language={languageViewData.language.card}/>
    }, [callbacks.addToBasket, select.language]),
  };

  const optionsLanguage = {
    language: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  const languageViewData = {
    language: useMemo(() =>  translate(select.language), [select.language])
  }

  return (
    <PageLayout>
      <Head title={languageViewData.language.title}>
        <SelectLanguage language={optionsLanguage.language} onChangeLanguage={callbacks.onChangeLanguage}/>
      </Head>
      <CrumbsContainer>
        <BreadCrumbs crumbs={menuPoints} language={languageViewData.language.menu.main}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} language={languageViewData.language.menu} dataLanguage={select.language}
                    sum={select.sum}/>
      </CrumbsContainer>
      <Loading loading={select.loading}>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination itemsPerPage={select.limit} totalItems={select.count} onChangePage={callbacks.onChangePage} number={select.page} parentLink={'/'}/>
      </Loading>
    </PageLayout>

  );
}

export default memo(Main);
