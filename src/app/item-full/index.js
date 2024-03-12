import {memo, useCallback, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import MainMenu from '../../components/main-menu';
import { useParams, Link } from "react-router-dom";
import PageLayout from '../../components/page-layout';
import BasketTool from '../../components/basket-tool';
import ItemDetail from '../../components/item-detail';
import Head from '../../components/head';
import { useLanguage } from "../../store/language-context";


function ItemFull() {
    
    const store = useStore();
    const params = useParams();
    const {Language, translations} = useLanguage();

    useEffect(() => {
      store.actions.card.loadCard(params.id);
    }, [params.id]);

    const select = useSelector(state => ({
        card: state.card.dataCard,
        errorMessage: state.card.errorMessage,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

        const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    return (
        <PageLayout>
            <Head title={select.card.title} />
            <MainMenu>
                <Link to="/">{translations['mainPage']}</Link>
                <BasketTool 
                    onOpen={callbacks.openModalBasket} 
                    amount={select.amount}
                    sum={select.sum}/>
            </MainMenu>
            <ItemDetail card = {select.card} onAddBasket={callbacks.addToBasket} />
        </PageLayout>
    );
}

export default memo(ItemFull);