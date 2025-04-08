import { memo, useCallback, useEffect} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import Language from '../../components/language';


function Main() {
  const store = useStore();

  const { limit, pageNumber } = useParams();



  const select = useSelector(state => ({
    list: state.catalog.list,
    listEn: state.catalog.listEn,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  let list = select.language === 'ru' ? select.list : select.listEn;


  useEffect(() => {
    store.actions.catalog.load((pageNumber-1)*limit, limit, select.language);
  }, [limit, pageNumber, select.language]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    languageRu: useCallback(() => store.actions.language.languageRu(), [store]),
    languageEn: useCallback(() => store.actions.language.languageEn(), [store]),
  };


  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} language={select.language}/>;
      },
      [callbacks.addToBasket, select.language],
    ),
  };

  return (
    <PageLayout>
      <Language
        language={select.language}
        languageRu={callbacks.languageRu}
        languageEn={callbacks.languageEn}
        />
      <Head title={select.language === 'ru'  ? 'Магазин' : 'Shop'} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
      <List list={list} renderItem={renders.item}/>
      <Pagination activePage={pageNumber} limit={limit}/>
    </PageLayout>
  );
}

export default memo(Main);
