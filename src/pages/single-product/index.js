import React, {useCallback, useEffect, useState} from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemSingle from "../../components/item-single";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";

function SingleProduct() {

  const [isLoading, setIsLoading] = useState(true)

  const store = useStore();
  const item = useSelector(state => state.catalog.item)

  const params = useParams()

  const addToBasket = useCallback(_id => store.actions.basket.addToBasket(_id), [store])

  useEffect( () => {

    const getData = async () => {
      await store.actions.catalog.loadOne(params.id);
    }

    getData()
    setIsLoading(false)

  }, [params.id]);



  return (
    <PageLayout>
      <Head title={item?.title}/>
      <BasketTool/>
      {!isLoading && item ? <ItemSingle item={item} addOn={addToBasket}/> : <h4>...Загрузка</h4>}
    </PageLayout>
  )
}

export default React.memo(SingleProduct);