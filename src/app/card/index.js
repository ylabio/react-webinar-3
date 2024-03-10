import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemCard from '../../components/item-card';
import translate from '../../store/language/use-translate';

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
		lang: state.language.language,
  }));

	const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		onChangeLang: useCallback(lang => store.actions.language.setLanguage(lang), [store]),
  }

  return (
    <PageLayout>
			<Head title={select.card.title}
						onChangeLang={callbacks.onChangeLang} 
						lang={select.lang}/>
			<BasketTool onOpen={callbacks.openModalBasket} 
									amount={select.amount}
                  sum={select.sum}
									translation={translate(select.lang)}/>
			<ItemCard card={select.card} onAdd={callbacks.addToBasket} translation={translate(select.lang).actions}/>
		</PageLayout>
  );
}

export default memo(Card);