import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemCard from '../../components/item-card';
import translate from '../../store/language/use-translate';
import Tools from '../../components/tools';
import Menu from '../../components/menu';
import Loader from '../../components/loader';

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
		isLoading: state.card.isLoading,
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
			<Tools>
				<Menu menuLinks={[{title: translate(select.lang).main, link: '/'}]}/>
				<BasketTool onOpen={callbacks.openModalBasket} 
										amount={select.amount}
                 	  sum={select.sum}
										translation={translate(select.lang)}/>
			</Tools>
			<Loader isLoading={select.isLoading}>
				<ItemCard card={select.card} onAdd={callbacks.addToBasket} translation={translate(select.lang).actions}/>
			</Loader>
		</PageLayout>
  );
}

export default memo(Card);