import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";

import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {useNavigate} from "react-router-dom";
import Layout from '../layout';
import { useTranslate } from '../../language/lang-conext';


function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const t= useTranslate();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    currPage: state.catalog.currPage,
    totalPages: state.catalog.totalPages,

  }));


  useEffect(() => {store.actions.catalog.loadArticles(select.currPage);}, [select.currPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store] ),
    // Установка текущей страницы
    setCurrPage: useCallback(page => store.actions.catalog.setCurrPage(page), [store]),
    onLink: useCallback(_id => navigate(`articles/${_id}`), [store]),
  };

  const renders = {
    item: useCallback((item) => {
        return (<Item item={item} onAdd={callbacks.addToBasket} onLink={callbacks.onLink} addText={t("links.add")}/>);
      }, [callbacks.addToBasket, t]),
  };

  return (
    <Layout title={t("main.title")}>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        onClick={callbacks.setCurrPage}
        currPage={select.currPage}
        totalPages={select.totalPages}
      />
    </Layout>
  );
}

export default memo(Main);
