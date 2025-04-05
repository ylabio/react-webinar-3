import { memo, useCallback, useEffect } from 'react';
import AboutItem from '../../components/AboutItem';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import List from '../../components/list'
import About from '../../components/about';
function AboutProduct() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    aboutProduct: state.product.aboutProduct,
  }));

  const callbacks = {
    // Открытие модалки корзины
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };
  useEffect(() => {
    //закрыть модалку если была открыта при переходе из корзины
    store.actions.modals.close()
  }, [select.aboutProduct]);

  const renders = {
    AboutItem: useCallback(
      item => {
        return <AboutItem item={item} onAdd={callbacks.addToBasket}/>;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={`${select.aboutProduct?.title}`} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <About aboutProduct={select.aboutProduct} renderItem={renders.AboutItem} />
    </PageLayout>
  );
}

export default memo(AboutProduct);
