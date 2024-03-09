import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemCard from '../../components/item-card';

function Card() {

	const store = useStore();
	const { id } = useParams();

	useEffect(() => {
    store.actions.card.loadCard(id);
  }, [id]);

	const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
		card: state.card.cardData,
  }));

	const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
			<Head title={select.card.title}/>
			<BasketTool onOpen={callbacks.openModalBasket} 
									amount={select.amount}
                  sum={select.sum}/>
			<ItemCard card={select.card} onAdd={callbacks.addToBasket}/>
		</PageLayout>
  );
}

export default memo(Card);