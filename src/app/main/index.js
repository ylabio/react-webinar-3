import {memo, useCallback, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Paginator from '../../components/paginator';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Preloader from '../../components/preloader';
import Error from '../../components/error';
import WithModal from '../../components/with-modal';

function Main() {

  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page")
    store.actions.catalog.load(Number(page) || 1);
  }, [searchParams]);

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    list: state.catalog.list,
    pagesCount: state.catalog.pagesCount,
    page: state.catalog.page,
    isFetching: state.catalog.isFetching,
    isSuccess: state.catalog.isSuccess,
    amount: state.basket.amount,
    sum: state.basket.sum,
    locales: state.translator.locales,
    locale: state.translator.locale
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переход на страницу
    load: useCallback(page => store.actions.catalog.load(page), [store]),
    // Перевод текста
    translate: useCallback(text => store.actions.translator.translate(text), [store, select.locale]),
    // Выбор локали
    setLocale: useCallback(locale => store.actions.translator.setLocale(locale), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} btnAddTitle={callbacks.translate('add')}/>
    }, [callbacks.addToBasket, select.locale]),
  };

  return (
    <WithModal activeModal={select.activeModal}>
      <PageLayout>
        <Head
          title={callbacks.translate('store')}
          locales={select.locales}
          locale={select.locale}
          setLocale={callbacks.setLocale}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          translate={callbacks.translate}/>
        { select.isFetching && <Preloader/> }
        { !select.isFetching && select.isSuccess &&
          <>
            <List
              list={select.list}
              renderItem={renders.item}/>
            <Paginator
              onSetPage={callbacks.load}
              pagesCount={select.pagesCount}
              page={select.page} />
          </>
        }
        { !select.isFetching && !select.isSuccess &&
          <Error
            message={callbacks.translate('failed to fetch data')}
            btnRetryTitle={callbacks.translate('try again')}
            onRetry={() => callbacks.load(select.page)}/>
        }
      </PageLayout>
    </WithModal>
  );
}

export default memo(Main);
