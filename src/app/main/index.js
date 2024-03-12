import {memo, useCallback, useEffect, useContext} from 'react';
import PageLayout from "../../components/page-layout";
import HeadLayout from '../head-layout';
import Item from "../../components/item";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useNavigate, useParams} from 'react-router-dom';
import {TextDataContext} from '../../contexts';
import {APP_PATHS} from '../../constants';

function Main({onChangeTextDataQuery}) {

  const textData = useContext(TextDataContext);

  const store = useStore();
  const select = useSelector(state => ({
    list: state.catalog.list,
    maxPage: state.catalog.pagination.max,
    currentPage: state.catalog.pagination.current,
    loadingPage: state.catalog.pagination.loadingPage,
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
  }, [rawPage]);

  // Добавление в корзину
  const addToBasket = useCallback(_id => store.actions.basket.addToBasket(_id), [store]);

  const renders = {
    item: useCallback((item) => {
      return <Item item={item}
                   onAdd={addToBasket}
                   linkUrl={APP_PATHS.PRODUCT}
                   textData={textData.catalogProduct}
              />

    }, [addToBasket, textData]),
  };

  return (
    <PageLayout>
      <HeadLayout textData={{mainNav: textData.mainNav,
                             basketTool: textData.basketTool,
                             pluralProduct: textData.pluralProduct}}
                  headTextData={textData.mainHead}
                  onChangeTextDataQuery={onChangeTextDataQuery}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination max={select.maxPage}
                  current={select.currentPage}
                  loadingPage={select.loadingPage}
                  linkUrl={APP_PATHS.CATALOG}
      />
    </PageLayout>
  );
}

Main.defaultProps = {
  onChangeTextDataQuery: () => {},
}

export default memo(Main);
