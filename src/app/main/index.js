import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import PageTools from '../../components/page-tools';
import List from '../../components/list';
import Loader from '../../components/loader';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import text from "../../text";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language || 'ru',
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={text[select.lang].storeName} />
      <BasketTool 
        openBasket={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        text={text[select.lang]}
      />
      {
        select.list ?
        <List>
          {select.list.map((item) => <Item key={item._id} item={item} onAdd={callbacks.addToBasket} text={text[select.lang].addButton} />)}
        </List>
        :
        <Loader />
      }
      <PageTools />
    </PageLayout>
  );
}

export default memo(Main);
