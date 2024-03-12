import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import MainMenu from '../../components/main-menu';
import MainNav from '../../components/main-nav';

function HeadLayout(props) {

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
      <Head textData={props.headTextData} onChangeTextDataQuery={props.onChangeTextDataQuery}/>
      <MainMenu>
        <MainNav currentPage={select.currentCatalogPage} textData={props.textData.mainNav}/>
        <BasketTool onOpen={openModalBasket}
                    amount={select.busketAmount}
                    sum={select.busketSum}
                    textData={{...props.textData.basketTool,
                               ...props.textData.pluralProduct}}
        />
      </MainMenu>
    </>
  );
}

HeadLayout.propTypes = {
  headTitle: PropTypes.string,
}

HeadLayout.defaultProps = {
  onChangeTextDataQuery: () => {},
}

export default memo(HeadLayout);
