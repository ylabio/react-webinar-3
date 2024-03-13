import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductBody from '../../components/product-body';
import { useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import Navigation from '../../components/navigation';
import Loading from '../../components/loading';

function Product() {

  const store = useStore();
  let { productId } = useParams();

  const select = useSelector(state => ({
    data:state.product.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading:state.product.isLoading
  }));
  
  useEffect(() => {
    if(productId !== select.data._id) {
      store.actions.product.load(productId);
    }
  }, [productId]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переход на главную
    toMain: useCallback(()=> store.actions.catalog.load(),[store])
  }

  return (
    <PageLayout>
      <Loading isLoading={select.isLoading}>
        <Head title={select.data.title}/>
        <Menu>
          <Navigation toMain={callbacks.toMain}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
        </Menu>
        <ProductBody data={select.data} onAdd={callbacks.addToBasket}/>
      </Loading>
    </PageLayout>

  );
}

export default memo(Product);
