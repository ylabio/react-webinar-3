import {memo, useCallback} from 'react';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import MainMenu from '../../components/main-menu';
import MainNav from '../../components/main-nav';


function HeadLayout({headTitle}) {

  const store = useStore();
  const select = useSelector(state => ({
    busketAmount: state.basket.amount,
    busketSum: state.basket.sum,
    currentCatalogPage: state.catalog.pagination.current,
  }));
  // Открытие модалки корзины
  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  return (
    <>
      <Head title={headTitle}/>
      <MainMenu>
        <MainNav currentPage={select.currentCatalogPage}/>
        <BasketTool onOpen={openModalBasket}
                    amount={select.busketAmount}
                    sum={select.busketSum}
        />
      </MainMenu>
    </>
  );
}

export default memo(HeadLayout);