import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {language} from '../../language';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Description from '../../components/description';
import Loading from '../../components/loading';
import Menu from '../../components/menu';
import Navbar from '../../components/navbar';

function Card () {

  const store = useStore();

  const params = useParams();

  useEffect(() => {
    store.actions.catalog.loadById(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    card: state.catalog.card,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.type,
    langMenu: language.menu.main,
    langBasketTool: language.basketTool,
    langDescription: language.description,
    langText: language.loading.loading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
     // Смена языка
     changeLanguage: useCallback((language) => store.actions.language.changeLanguage(language), [store])
  }

  return (
    <PageLayout>
      <Head title={select.card.title} changeLanguage={callbacks.changeLanguage}/>
      <Navbar>
        <Menu langMenu={select.langMenu[select.language]}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} multilingualText={select.langBasketTool} language={select.language}/>
      </Navbar>
      {select.loading 
        ? <Loading langText={select.langText[select.language]}/>
        : <Description card={select.card} onAdd={callbacks.addToBasket} 
                       multilingualText={select.langDescription} language={select.language}/>
      }
    </PageLayout>
  );
}

export default memo(Card);