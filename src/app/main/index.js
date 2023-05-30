import {memo, useCallback, useState} from 'react';
import PageLayout from "../../components/page-layout";
import {Route, Routes} from "react-router-dom";
import PageError from "../../components/page-error";
import Head from "../../components/head";
import PageList from "../page-list";
import PageItem from "../page-item";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Menu from "../../components/menu";
import {translation} from "../../translation";

function Main() {
  const store = useStore();
  const [headTitle, setHeadTitle] = useState('....');
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLang: state.translation.currentLang
  }));
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store.actions.modals]),
    changeTranslation: useCallback((lang) => store.actions.translation.setTranslation(lang), [store.actions.translation]),
    changeHeadTitle: useCallback((title) => { setHeadTitle(title); }, [headTitle])
  }
  return (
    <PageLayout>
      <Head translation={headTitle} currentLang={select.currentLang} onChangeLang={callbacks.changeTranslation}/>
      <Menu translation={translation.menu[select.currentLang]} onOpen={callbacks.openModalBasket}
            amount={select.amount} sum={select.sum}/>
      <Routes>
        <Route path="/" element={<PageList currentLang={select.currentLang} onChangeHeadTitle={callbacks.changeHeadTitle}/>}/>
        <Route path="/:currentPage" element={<PageList currentLang={select.currentLang} onChangeHeadTitle={callbacks.changeHeadTitle}/>}/>
        <Route path="/item/:currentItemId" element={<PageItem currentLang={select.currentLang} onChangeHeadTitle={callbacks.changeHeadTitle}/>}/>
        <Route path="/*" element={<PageError translation={translation.notFound[select.currentLang]}/>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
