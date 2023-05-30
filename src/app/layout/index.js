import { memo, useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import WrapperBetween from '../../components/wrapper-between';
import Menu from '../../components/menu/menu';
import { LangContext,  useTranslate } from '../../language/lang-conext';

function Layout(props) {
  const store = useStore();

  const {lang, changeLang} = useContext(LangContext);
  const t= useTranslate();
 
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
   
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    selectLang: useCallback((lang)=>changeLang(lang),[])
  };

  return (
    <PageLayout>
      <Head title={props.title} selectLang={callbacks.selectLang} lang={lang}/>
      <WrapperBetween>
        <Menu links={[{link:'/', title: t("links.main")}]}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          texts={{inBasket:t("main.inBasket"), empty:t("main.empty"), productPlural:t("productPlural"), open:t("links.open")}}
        />
      </WrapperBetween>
      {props.children}
    </PageLayout>
  );
}
Layout.propTypes = {
  title:PropTypes.string,
};

Layout.defaultProps = {
  title:"",
}


export default memo(Layout);
