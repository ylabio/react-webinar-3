import React, {useCallback, useEffect, useState} from "react";
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import ProductInfo from "../product-info";
import {useParams} from "react-router";
import {itemsRequests} from "../../api/items-requests";

const ProductPage = () => {
  const [itemInfo, setItemInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams();
  //вытаскиваем параметры адрессной строки, itemId, мы задавали в app -> Route
  const itemId = params.itemId

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const getItemInfo = async (id) => {
    let response = await itemsRequests.getProductById(id);
    setItemInfo(response);
    // делаем искуственную задержку, чтоб наше изображение не так резко дергалось в случае быстрого ответа
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    store.actions.catalog.load();
    getItemInfo(itemId)
  }, [])

  return (
    <PageLayout>
      {
        loading
        ? <div>Loading...</div>
        : <>
            <Head title={itemInfo.title}/>
            <BasketTool onOpen={callbacks.openModalBasket}
                        amount={select.amount}
                        sum={select.sum}
                        withLink={true}/>
            <ProductInfo itemInfo={itemInfo} loading={loading} onAdd={callbacks.addToBasket}/>
          </>
      }
    </PageLayout>
  )
}

export default React.memo(ProductPage)