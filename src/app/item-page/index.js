import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemPageComponent from '../../components/item-page';
import Menu from '../../components/menu';
import {useCallback} from 'react';

function ItemPage() {
  const {id} = useParams();
  const store = useStore();

  console.log(store);

  useEffect(() => {
    store.actions.item.loadItem(id);
    store.actions.modals.close();

    return () => {
      store.actions.item.clear();
    };
  }, [id]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item,
  }));

  console.log(select);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.item.item?.title}></Head>
      <Menu>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        ></BasketTool>
      </Menu>
      <ItemPageComponent {...select.item} {...callbacks}></ItemPageComponent>
    </PageLayout>
  );
}

export default ItemPage;
