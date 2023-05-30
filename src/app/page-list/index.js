import {memo, useCallback, useEffect, useState} from "react";
import List from "../../components/list";
import useSelector from "../../store/use-selector";
import Item from "../../components/item";
import useStore from "../../store/use-store";
import {redirect, useParams} from "react-router-dom";
import Pagination from "../../components/pagination";
import Loading from "../../components/Loading";
import {translation} from "../../translation";
import PropTypes from "prop-types";

function PageList({onChangeHeadTitle, currentLang}) {
  const currentPage = Number(useParams().currentPage) || 1;
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const select = useSelector(state => ({
    list: state.catalog.list,
    pageAmount: state.catalog.pageAmount,
    perPage: state.catalog.perPage
  }));

  useEffect(() => {
    setIsLoading(true);
    store.actions.catalog.load(currentPage, select.perPage)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        redirect('/page404');
      });
  }, [currentPage, select.perPage]);

  useEffect(() => {
    onChangeHeadTitle(translation.head[currentLang].title);
  }, [currentLang]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store.actions.basket]),
    // Открытие модалки корзины
    changePerPage: useCallback((newPerPage) => store.actions.catalog.setPerPage(newPerPage), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item link={`/item/${item._id}`} translation={translation.item[currentLang]} item={item}
                   onAdd={callbacks.addToBasket}/>
    }, [select.item, callbacks.addToBasket, currentLang]),
  };
  return (
    <>
      {isLoading ? <Loading/> : <>
        <List list={select.list} renderItem={renders.item}/>
        {select.pageAmount > 1 &&
          <Pagination onChangePerPage={callbacks.changePerPage} translation={translation.pagination[currentLang]}
                      perPage={select.perPage} currentPage={currentPage} pageAmount={select.pageAmount}/>}
      </>}
    </>
  );
}

PageList.propTypes = {
  onChangeHeadTitle: PropTypes.func,
  currentLang: PropTypes.string
};

export default memo(PageList)
