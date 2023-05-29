import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import ProductInfo from '../../components/product-info';
import NavMenu from '../../components/nav-menu';
import Separator from '../../components/separator';

import { navList } from '../main';

function Product() {

  const { productId } = useParams();

  const store = useStore();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(product => store.actions.basket.addToBasket(product), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  useEffect(() => {
    store.actions.catalog.loadProduct(productId);
  }, [productId]);


  const select = useSelector(state => ({
    // list: state.catalog.list,
    sum: state.basket.sum,
    amount: state.basket.amount,
    currentProduct: state.catalog.currentProduct,
  }));

  // useEffect(() => {
  //   if (select.list.length === 0) {

  //   }
  // }, [])


  const {title, ...productProps} = select.currentProduct

  return (
    <PageLayout>
      <Head title={title}/>
      <Separator>
        <NavMenu navList={navList}></NavMenu>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </Separator>
      <ProductInfo {...productProps} productId={productId} title={title}  addToBasket={callbacks.addToBasket}/>
      {/* <button onClick={() => callbacks.addToBasket(productId)}>Добавить</button> */}
    </PageLayout>

  );
}

export default memo(Product);
