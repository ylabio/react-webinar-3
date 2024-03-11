import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { Link } from 'react-router-dom';
import { langArr } from '../../utils';

function Main({language,setLanguage}) {

  const store = useStore();

  // useEffect(() => {
  //   store.actions.catalog.load(10);
  // }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} language={language}/>
    }, [callbacks.addToBasket,language]),
  };
  
  return (
    
    <PageLayout>
        <Head title={langArr.shop[language]}>
          <div className='lang__btns'>
            <button onClick={() => setLanguage('ru')}>ru</button>
            <button onClick={() => setLanguage('en')}>eng</button>
          </div>
        </Head>
        <BasketTool language={language} onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} button={<Link to="/" className="Main-page" style={{marginRight:"auto",color:'#0087E9'}}>{langArr.main[language]}</Link>}/>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination/>
    </PageLayout>
    

  );
}

export default memo(Main);