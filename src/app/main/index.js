import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import HeadLayout from '../head-layout';
import Item from "../../components/item";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useNavigate, useParams} from 'react-router-dom';

function Main() {

  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    maxPage: state.catalog.pagination.max,
    currentPage: state.catalog.pagination.current,
  }));

  const rawPage = useParams().page
  const navigate = useNavigate();

  useEffect(() => {
    const page = Math.abs(parseInt(rawPage));
    if(!page) {
      navigate('/1');
    } else {
      store.actions.catalog.load(page);
    }
  }, [rawPage, select.currentPage]);

  // Добавление в корзину
  const addToBasket = useCallback(_id => store.actions.basket.addToBasket(_id), [store]);

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={addToBasket}/>
    }, [addToBasket]),
  };

  return (
    <PageLayout>
      <HeadLayout headTitle={'Магазин'}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination max={select.maxPage} current={select.currentPage} />
    </PageLayout>

  );
}

export default memo(Main);
