import {memo, useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер с компонентами навигации
 */
function Navigation() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
    params: state.catalog.params,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      document.body.style.overflow = "hidden";
      store.actions.modals.open('basket');
    }, [store]),
    // Обработка перехода на главную
    onNavigate: useCallback((item) => {
      //store.actions.catalog.initParams({}, store.actions.user.getState().token);
      //store.actions.user.fGetDataUser(store.actions.catalog.getState().params.token);
      //if (item.key === 1) store.actions.catalog.resetParams();
    }, [store])
  }

  // Функция для локализации текстов
  const {t} = useTranslate();

  let urlSearch = new URLSearchParams(select.params).toString();
  const url = '/' + '?' + urlSearch + window.location.hash;
  
  const options = {
    menu: useMemo(() => ([
      {key: 1, title: t('menu.main'), link: url},
    ]), [t,url])
  };

  return (
    <SideLayout side='between'>
      <Menu items={options.menu} onNavigate={callbacks.onNavigate}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} t={t}/>
    </SideLayout>
  );
}

export default memo(Navigation);
