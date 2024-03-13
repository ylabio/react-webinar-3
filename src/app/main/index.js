import { memo, useCallback, useEffect, useState } from 'react';
import {Link, useNavigate, useLocation } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import {useLanguage} from '../../localization/language-context';
import LoaderWrapper from '../../components/loader-wrapper';
import texts from '../../localization/texts';

function Main() {

  const store = useStore();
  const {language, toggleLanguage} = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalPages: state.catalog.totalPages,
    limit: state.catalog.limit,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const currentSkipValue = select.currentPage * select.limit;

  useEffect(() => {
    store.actions.catalog.load(select.limit, currentSkipValue)
      .then(() => setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
      });
    if (select.currentPage !== null) {
      navigate(`?currentPage=${select.currentPage}`);
    }
  }, [select.limit, currentSkipValue, select.currentPage, navigate]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    generatePaginationButton: useCallback((pageNumber, limit) => store.actions.catalog.generateButton(pageNumber, limit), [store]),
    setCurrentPage: useCallback(currentPage => {
      store.actions.catalog.setCurrentPage(currentPage);
      navigate(`?currentPage=${currentPage}`);
    }, [navigate, store]),
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = parseInt(searchParams.get('currentPage')) || 0;
    callbacks.setCurrentPage(pageParam);
  }, [location.search]);

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} language={texts[language]}
                link={<Link to={`/info/${item._id}`}>{item.title}</Link>}/>
    }, [callbacks.addToBasket, language]),
  };

  return (
    <PageLayout>
      <Head title={texts[language].shop} language={texts[language]} toggleLanguage={toggleLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} language={texts[language]}
        link={<Link to={`/?currentPage=0`}>{texts[language].main}</Link>}/>
      <LoaderWrapper isLoading={isLoading} language={texts[language]}>
        <List list={select.list} renderItem={renders.item} />
        {select.totalPages &&
          <Pagination totalPages={select.totalPages} currentPage={select.currentPage}
            limit={select.limit}
            generateButton={callbacks.generatePaginationButton}
            setCurrentPage={callbacks.setCurrentPage}/>}
      </LoaderWrapper>
    </PageLayout>
  );
}

export default memo(Main);
