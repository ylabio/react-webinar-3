import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import PageMenu from "../../components/page-menu";
import PageHeader from "../../components/page-header";
import {useNavigate} from "react-router-dom";
import ListLoader from "../../components/list-loader";

function Main() {

  const store = useStore();

  const navigate = useNavigate()

  useEffect(() => {
    store.actions.catalog.getCount()
      .then(() => store.actions.catalog.getTotalPages())

    const chosenPage = parseInt(new URLSearchParams(window.location.search).get('page') || 0)
    if (chosenPage) {
      store.actions.catalog.changePage(chosenPage)
    } else {
      store.actions.catalog.load()
    }
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    lang: state.lang.lang,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLang: useCallback((lang) => store.actions.lang.changeLang(lang), [store]),
    changePage: useCallback((currentPage) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('page', currentPage);
      navigate({ search: searchParams.toString() });
      store.actions.catalog.changePage(currentPage)
    }, [store]),
    getTotalPages: useCallback(() => store.actions.catalog.getTotalPages(), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} link={`/items/${item._id}`} onAdd={callbacks.addToBasket} lang={select.lang}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <PageHeader
        title={'Магазин'}
        lang={select.lang}
        changeLang={callbacks.changeLang}
      />
      <PageMenu
        openModal={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <ListLoader isLoading={select.loading} lang={select.lang}>
        <List list={select.list} renderItem={renders.item}/>
      </ListLoader>
      <Pagination currentPage={select.currentPage} changePage={callbacks.changePage} totalPages={select.totalPages} count={select.count} />
    </PageLayout>
  );
}

export default memo(Main);
