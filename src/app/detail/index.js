import PageLayout from "../../components/page-layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import '../../components/detail-product/style.css'
import {useParams} from "react-router-dom";
import DetailProduct from '../../components/detail-product'
import PageOptions from "../../components/page-optoins";
import Head from "../../components/head";
const Detail = () => {
  const store = useStore();
  const { itemId } = useParams();
  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  useEffect(() => {
    const getDetails = async ()=>{
      await store.actions.details.load(itemId)
    }
    getDetails()
  // }, []);
  }, [itemId, store.actions.details]);
  const select = useSelector(state => ({
    data: state.details.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  return (
    <PageLayout>
      <Head title={select.data.title}/>
      <PageOptions
        amount={select.amount}
        sum={select.sum}
        onOpen={callbacks.openModalBasket}
      />
      <DetailProduct
        data={select.data}
        addToBasket={callbacks.addToBasket}
      />
    </PageLayout>
  );
};

export default Detail;