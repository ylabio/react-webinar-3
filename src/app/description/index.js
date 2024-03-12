import { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import { numberFormat } from "../../utils";
import DescriptionBasketTool from "../../components/description-basket-tool";
import DescriptionBody from "../../components/description-body";
import './style.css';


function Description() {

  const { _id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.item.load({ _id });
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item.selectedItem,
    texts: state.language.texts
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(select.item._id), [store, select.item._id]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //смена языка
    changeLanguage: useCallback(lang => store.actions.language.changeLanguage(lang), [store])
  }

  return (
    <PageLayout>
      <Head title={select.item.title} onChange={callbacks.changeLanguage} locale={select.texts.locale}/>
      <DescriptionBasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} texts={select.texts.description?.basket_tool} locale={select.texts.locale} />
      <DescriptionBody item={select.item} texts={select.texts.description?.body} />
      <button onClick={callbacks.addToBasket}>{select.texts.description?.add}</button>
    </PageLayout>
  );
}
export default memo(Description);