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


function Description(){

  const {_id} = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.item.load({_id});
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item.selectedItem
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(select.item._id), [store, select.item._id]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <DescriptionBasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <DescriptionBody item={select.item}/>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </PageLayout>
  );
}
export default memo(Description);