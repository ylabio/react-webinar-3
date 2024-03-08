import { memo, useCallback, useEffect, useMemo } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import ItemCard from "../../components/item-card";
import { menuPoints } from "../../utils";
import BreadCrumbs from "../../components/bread-crumbs";
import CrumbsContainer from "../../components/crumbs-container";
import Loading from "../../components/loading";
import translate from "../../translation/translation";
import SelectLanguage from "../../components/select-language";


function Card() {

  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.actions.card.getCard(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    card: state.card.dataCard,
    errorMessage: state.card.errorMessage,
    loading: state.card.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangeLanguage: useCallback(lang => store.actions.language.setLanguage(lang), [store]),
  }

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
        <ItemCard card={select.card} error={select.errorMessage} onAddBasket={callbacks.addToBasket} language={languageViewData.language.card}/>
      </Loading>
    </PageLayout>
  );
}

export default memo(Card);
