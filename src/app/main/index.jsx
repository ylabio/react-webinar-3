import {
    memo,
    useCallback,
    useEffect,
    useState
} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination/index.js";
 
function Main() {

    const store = useStore();
    const [currentPage, setCurrentPage] = useState(1);

  
    useEffect(() => {
        store.actions.catalog.load(currentPage - 1);
    }, [currentPage]);

    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        pageCount: state.catalog.pageCount
    }));

    const handlePaginate = pageNumber => setCurrentPage(pageNumber);

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    };

    const renders = {
        item: useCallback((item) => {
            return <Item item={item} onAdd={callbacks.addToBasket} navigatePath={`/article/${item._id}`} />
        }, [callbacks.addToBasket]),
    };

    return ( 
        <PageLayout>
            <Head title='Магазин' / >
            <BasketTool onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}
            /> 
            <List list={select.list} renderItem={renders.item}/> 
            {select.pageCount > 0 ? 
                <Pagination 
                    pageCount={select.pageCount} 
                    handlePaginate={handlePaginate} 
                    currentPage={currentPage}/> : null}
        </PageLayout>
    );
}

export default memo(Main);