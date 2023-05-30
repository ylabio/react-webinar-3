import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { getPageCount } from '../../utils';
import { Pagination } from '../../components/pagination';
import HeadBottom from '../../components/head-bottom';

function Main() {
	const [totalPages, setTotalPages] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 10;
	const skip = 0;

	const store = useStore();

	useEffect(() => {
		initLoad();
	}, []);

	const initLoad = async () => {
		await store.actions.catalog.load(limit, skip);
	}

	const select = useSelector((state) => ({
		list: state.catalog.list,
		amount: state.basket.amount,
		sum: state.basket.sum,
    count: state.catalog.count
	}));


	useEffect(() => {
		if (select.count === 0) return;
		let countBtnPagination = getPageCount(select.count, limit);
		setTotalPages(countBtnPagination);
	}, [select.count]);

	const changePage = (number) => {
		let newSkip = (number - 1) * limit;
		store.actions.catalog.load(limit, newSkip);
		setCurrentPage(number);
	};

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
	};

	const renders = {
		item: useCallback(
			(item) => {
				return <Item item={item} onAdd={callbacks.addToBasket} />;
			},
			[callbacks.addToBasket]
		),
	};

	return (
		<PageLayout>
			<Head title="Магазин" />
      <HeadBottom onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			<List list={select.list} renderItem={renders.item} />
			<Pagination totalPages={totalPages} changePage={changePage} currentPage={currentPage} />
		</PageLayout>
	);
}

export default memo(Main);
