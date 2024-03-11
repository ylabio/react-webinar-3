import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import MenuLayout from "../../components/menu-layout";
import Nav from "../../components/nav";
import BtnPages from "../../components/btn-pages";

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPage: state.catalog.totalPage,
    limit: state.catalog.limit,
    valueLang: state.language.valueLang,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.limit, currentPage);
  }, [currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Переход на страницу с товаром
    showCardProduct: useCallback((_id) => {
      store.actions.product.loadProduct(_id), [store];
      navigate(`/product_page/${_id}`);
    }),
    // Смена языка
    onChangeLang: useCallback(()=> store.actions.language.changeLang()),
  };

  const renders = {
    item: useCallback((item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            onProduct={callbacks.showCardProduct}
          />
        );
      }, [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout 
      head={
        <Head 
          title={ select.valueLang ? "Магазин" : "Shop" }
          onChangeLang={callbacks.onChangeLang}
          valueLang={select.valueLang} 
        />
      }
      footer={
        <BtnPages
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={select.totalPage}
        />
      }
    >
      <MenuLayout>
        <Nav textLink={ select.valueLang ? "Главная" : "Main" }/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          valueLang={select.valueLang}
        />
      </MenuLayout>
      <List list={select.list} renderItem={renders.item} />
    </PageLayout>
  );
}

export default memo(Main);
