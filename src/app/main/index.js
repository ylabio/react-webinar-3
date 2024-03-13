import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import translate from '../../store/language/use-translate';
import Tools from '../../components/tools';
import Menu from '../../components/menu';
import Loader from '../../components/loader';
import { useParams } from "react-router-dom";

function Main() {

  const store = useStore();

	const {id} = useParams();

  useEffect(() => {
		const currentId = Number(id) || 1;
    store.actions.catalog.loadCatalog(currentId);
  }, [id]);

  const select = useSelector(state => ({
    list: state.catalog.list,
		count: state.catalog.totalCount,
    size: state.catalog.pageSize,
    page: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
		lang: state.language.language,
		isLoading: state.catalog.isLoading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		onChangePage: useCallback(page => store.actions.catalog.loadCatalog(page), [store]),
		onChangeLang: useCallback(lang => store.actions.language.setLanguage(lang), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} 
									 onAdd={callbacks.addToBasket} 
									 link={`/card/${item._id}`} 
									 translation={translate(select.lang).actions.add}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <Head title={translate(select.lang).titles.main} 
						onChangeLang={callbacks.onChangeLang} 
						lang={select.lang}/>
			<Tools>
				<Menu menuLinks={[{title: translate(select.lang).main, link: '/'}]}/>
				<BasketTool onOpen={callbacks.openModalBasket} 
										amount={select.amount}
										sum={select.sum}
										translation={translate(select.lang)}/>
			</Tools>
      <Loader isLoading={select.isLoading}>
				<List list={select.list} 
							renderItem={renders.item}/>
				<Pagination totalCount={select.count} 
										currentPage={select.page} 
										pageSize={select.size} 
										siblingCount={1} 
										onChangePage={callbacks.onChangePage}
										path={'/'}/>
			</Loader>
    </PageLayout>

  );
}

export default memo(Main);