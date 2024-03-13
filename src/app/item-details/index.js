import {memo, useEffect, useState, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import Loader from "../../components/loader/index";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Navigate from "../../components/navigate";
import ItemInfo from "../../components/item-info/item-info";
import useSelector from "../../store/use-selector";
import translate from "../../language/translate.json";
import {useLangContext} from "../../store/use-lang-context";
import useStore from "../../store/use-store";

function ItemDetails() {
  const store = useStore();
  const {language} = useLangContext();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const details = useSelector(state => state.catalog.details);
  const basket = useSelector(state => state.basket);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLoadDetails: useCallback(id => store.actions.catalog.loadDetails(id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangePage: useCallback(page => store.actions.catalog.load(page), [store]),
  };

  useEffect(() => {
    callbacks.onChangePage(details.currentPage);
  },[])

  useEffect(() => {
     setIsLoading(true);
     callbacks.onLoadDetails(id.slice(1))
     .then(()=> setIsLoading(false))
  }, [id, details._id, callbacks.onLoadDetails]);

  return isLoading ? (
    <Loader />
    ) : (
      <>
        <Head title={details.title}/>
        <div className='row'>
          <Navigate/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={basket.amount} sum={basket.sum}/>
        </div>
        <ItemInfo details={details} addToBasket={callbacks.addToBasket} buttonTitle={translate.Add[language]}/>
      </>
  )
}

export default memo(ItemDetails);