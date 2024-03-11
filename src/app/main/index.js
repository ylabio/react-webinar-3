import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket";
import ToolPages from "../../components/tool-pages";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, [store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    count: state.catalog.count,
    variablesLanguage: state.lingua.variablesLanguage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id,0), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      document.body.style.overflow = "hidden";
      store.actions.modals.open('basket');
    }, [store]),
    // Открытие страницы в каталоге
    openPageToCatalog: useCallback((page) => store.actions.catalog.setPage(page), [store]),
    onRu: useCallback(() => store.actions.lingua.setVariable('ru-RU'), [store]),
    onEn: useCallback(() => store.actions.lingua.setVariable('en-EN'), [store]),
    onDe: useCallback(() => store.actions.lingua.setVariable('de-DE'), [store]),
    onCn: useCallback(() => store.actions.lingua.setVariable('cn-CN'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item}
                   onAdd={callbacks.addToBasket}
                   buttonAddProduct={select.variablesLanguage.buttonAddProduct}/>
    }, [callbacks.addToBasket,select]),
  };

const activeModal = useSelector((state) => {return(state.modals.name)});

  return (
    <>
    {(store.actions.lingua.getState().Language == 'null' ? store.actions.lingua.setVariable('ru-RU') : '')}
    <main>
    <PageLayout>
      <Head title={select.variablesLanguage.Page1.title}
            selectLanguage={true}
            onRu={callbacks.onRu}
            onEn={callbacks.onEn}
            onDe={callbacks.onDe}
            onCn={callbacks.onCn}
            label={select.variablesLanguage.Page1.selectLanguage.label}
            bauttonRu={select.variablesLanguage.Page1.selectLanguage.bauttonRu}
            bauttonEn={select.variablesLanguage.Page1.selectLanguage.bauttonEn}
            bauttonDe={select.variablesLanguage.Page1.selectLanguage.bauttonDe}
            bauttonCn={select.variablesLanguage.Page1.selectLanguage.bauttonCn} />
      <BasketTool onOpen={callbacks.openModalBasket}
                  amount={select.amount}
                  sum={select.sum}
                  main={select.variablesLanguage.BasketTool.main}
                  label={select.variablesLanguage.BasketTool.label}
                  buttonBasket={select.variablesLanguage.BasketTool.buttonBasket}
                  one={select.variablesLanguage.BasketTool.product.one}
                  few={select.variablesLanguage.BasketTool.product.few}
                  many={select.variablesLanguage.BasketTool.product.many}
                  empty={select.variablesLanguage.BasketTool.empty} />
      <List list={select.list} renderItem={renders.item}/>
      <ToolPages page={select.page+1} count={select.count+1} openPageToCatalog={callbacks.openPageToCatalog}/>
    </PageLayout>
    </main>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(Main);
