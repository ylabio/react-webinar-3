import { memo, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket";
import useSelector from "../../store/use-selector";
import Loader from "../../components/loader";
import ProductInfo from "../../components/product-info";
import useStore from "../../store/use-store";
import Button from "../../components/button";

function Product() {
  const store = useStore();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`);

        const data = await response.json();

        setProduct({
          _id: data.result._id,
          title: data.result.title,
          description: data.result.description,
          madeIn: data.result.madeIn?.title,
          category: data.result.category?.title,
          edition: data.result.edition,
          price: data.result.price,
        });
      } catch (e) {

      }
    }

    fetchProduct();

    store.actions.page.setCurrentPage('product')
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(product._id), [product]),
  }




  return (
    <PageLayout>
      { product ? (
        <>
          <Head title={product.title}/>
          <BasketTool />

          <ProductInfo product={product}/>
          <Button style="primary" title="Добавить" onClick={callbacks.addToBasket}/>
          {activeModal === 'basket' && <Basket/>}
        </>
      ) : (
        <>
          <Head title="Загрузка..." />
          <BasketTool />
          <Loader />
        </>
      )
      }

    </PageLayout>
  )
}

export default memo(Product);
