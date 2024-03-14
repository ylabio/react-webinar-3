import React, {memo,useCallback,useEffect,useMemo} from 'react';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from "react-router-dom";
import Menu from '../../components/menu';
import { numberFormat,langArr } from '../../utils';
import ItemLayout from '../../components/item-layout';

const ProductPage = ({language,setLanguage}) => {
    const params = useParams();
    const store = useStore();

    const select = useSelector(state => ({
        itemInfo: state.itemInfo.itemInfo,amount: state.basket.amount,
        sum: state.basket.sum,
        amount: state.basket.amount,
        
      }));
    
    const callbacks = {
    // Добавление в корзину
    // addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    addToBasketRequest: useCallback(_id => store.actions.basket.addToBasketRequest(_id), [store])
    }
    
    useEffect(() => {
        store.actions.itemInfo.getInfo(params.id);
    }, [params.id])
    

    return (
        <PageLayout>
            <ItemLayout 
            language={language} 
            setLanguage={setLanguage} 
            select={select} 
            addToBasketRequest={callbacks.addToBasketRequest} 
            openModalBasket={callbacks.openModalBasket}/> 
        </PageLayout>
    );
};

export default memo(ProductPage);