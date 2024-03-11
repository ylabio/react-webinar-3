import { memo, useCallback } from "react"
import Head from '../head'
import NavMain from '../nav-main'
import NavMenu from '../nav-menu'
import BasketTool from '../basket-tool'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PropTypes from 'prop-types';


function Header({title}) {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const {amount, sum } = select

  const onOpen = useCallback(() => store.actions.modals.open('basket'), [store]);

  return (
    <header className="Header">
      <Head {...{title}}/>
      <NavMenu>
        <NavMain />
        <BasketTool {...{onOpen, sum, amount}} />
      </NavMenu>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}

export default memo(Header)