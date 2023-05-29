import {cn as bem} from "@bem-react/classname";
import BasketTool from "../../components/basket-tool";
import {memo, useCallback, useEffect} from "react";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import Head from "../../components/head";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import ProductInfo from "../../components/product-info";
import MenuContainer from "../../components/menu-container";
import Menu from "../../components/menu";


function Product() {
  const {productId} = useParams();
  const cn = bem('Product');
  const store = useStore();

  useEffect(() => {
    store.actions.product.load(productId)
  }, [productId])


  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.product,
  }))

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }


  return (
    <PageLayout>
      <Head title={select.product.title}/>
      <MenuContainer>
        <Menu/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </MenuContainer>
      {select.product && <ProductInfo product={select.product} onAdd={callbacks.addToBasket} productId={productId}/>}
    </PageLayout>
  )
}

export default memo(Product)

