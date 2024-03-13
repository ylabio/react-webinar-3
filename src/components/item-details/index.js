import {memo, useEffect, useState, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Loader from "../loader/index";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Navigate from "../../components/navigate/";
import useSelector from "../../store/use-selector";
import translate from "../../app/language/translate.json";
import {useLangContext} from "../../store/use-lang-context";
import useStore from "../../store/use-store";
import './style.css';

function ItemDetails() {
  const store = useStore();
  const {language} = useLangContext();
  const { id } = useParams();
  const cn = bem('ItemDetails');
  const [isLoading, setIsLoading] = useState(false);
  const details = useSelector(state => state.catalog.details);
  const basket = useSelector(state => state.basket);

  const callbacks = {
    // onAdd: (e) => props.onAdd(details._id),
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
        <div className={cn()}>
        <div className={cn('description')}>{Object.keys(details).length ? details.description : ''}</div>
        <div className={cn('country')}>Страна производитель: <b>{Object.keys(details).length ? `${details.madeIn.title} (${details.madeIn.code})` : ''}</b></div>
        <div className={cn('category')}>Категория: <b>{Object.keys(details).length ? details.category.title : ''}</b></div>
        <div className={cn('edition')}>Год выпуска: <b>{details.edition}</b></div>
        <div className={cn('price')}><b>Цена: {numberFormat(details.price || 0)} ₽</b></div>
        <div className={cn('cell')}>
          <button onClick={() => callbacks.addToBasket(details._id)}>{translate.Add[language]}</button>
        </div>
    </div>
      </>
  )
}

export default memo(ItemDetails);