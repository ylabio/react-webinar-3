import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ItemCard from '../../components/item-card';
import NavigationTool from '../../components/navigation-tool';
import Navigation from '../../components/navigation';

function Card() {
  const store = useStore();
  const params = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.count,
    cardData: state.cardStore.cardData,
    isLoading: state.cardStore.isLoading
  }));

  useEffect(() => {
    store.actions.cardStore.loadCardData(params.id);
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.cardData.title} />
      <NavigationTool>
        <Navigation navItems={[{title: 'Главная', link: '/'}]} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </NavigationTool>
      <ItemCard cardData={select.cardData} onAdd={callbacks.addToBasket} isLoading={select.isLoading} />
    </PageLayout>
  )
}

export default memo(Card);