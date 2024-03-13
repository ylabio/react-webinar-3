import {memo, useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import MainMenu from '../../components/main-menu';
import MainNav from '../../components/main-nav';
import {TextDataContext} from '../../contexts';
import { APP_PATHS } from '../../constants';

function HeadLayout(props) {

  const textData = useContext(TextDataContext);

  const store = useStore();
  const select = useSelector(state => ({
    busketAmount: state.basket.amount,
    busketSum: state.basket.sum,
    currentCatalogPage: state.catalog.pagination.current,
  }));
  const mainNavLinks = {
    main: APP_PATHS.CATALOG + (select.currentCatalogPage || 1),
  }
  // Открытие модалки корзины
  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  return (
    <>
      <Head textData={props.headTextData} onChangeTextDataQuery={props.onChangeTextDataQuery}/>
      <MainMenu>
        <MainNav textData={textData.mainNav}
                 links={mainNavLinks}
        />
        <BasketTool onOpen={openModalBasket}
                    amount={select.busketAmount}
                    sum={select.busketSum}
                    textData={{...textData.basketTool,
                               ...textData.pluralProduct}}
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
