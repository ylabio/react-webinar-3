import {memo, useCallback, useEffect} from "react";
import useSelector from "../../store/use-selector";
import PaginationLayout from "../../components/pagination-layout";
import {useNavigate, useParams} from "react-router-dom";
import useStore from '../../store/use-store';
import Item from '../../components/item';
import List from '../../components/list';
import Preloader from '../../components/preloader';

function MainPage() {
  const store = useStore();
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    if (!Number(id) || !id) {
      store.actions.catalog.load();
    } else {
      store.actions.catalog.load(+id);
    }
  }, [id]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    pages: state.catalog.pages,
    activePage: state.catalog.activePage,
    lang: state.lang.lang,
    loading: state.catalog.loading
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // переключение на другую страницу
    onSelectPage: useCallback((page) => {
      store.actions.catalog.load(page);
      navigate(`/${page}`)
    }),
    onMousePagination: useCallback((e, page) => {
      console.log('qqq');
      if (e.button === 1) {
        e.preventDefault();
        window.open(`/${page}`, '_blank');
      }
    }, [])
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            lang={select.lang}
          />
        );
      },
      [callbacks.addToBasket, select.lang]
    )
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <PaginationLayout
        pages={select.pages}
        activePage={select.activePage}
        onMousePagination={callbacks.onMousePagination}
        onSelectPage={callbacks.onSelectPage}
      />
      {select.loading && <Preloader />}
    </>
  );
}

export default memo(MainPage);
