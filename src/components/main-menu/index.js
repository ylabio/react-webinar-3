import { memo, useCallback } from "react";
import { Link } from "react-router";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

function MainMenu() {
  const store = useStore();

  const select = useSelector( state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModal: useCallback(() => store.actions.modals.open('basket'), [store])
  };


  return (
    <div className="Main-menu">
        <Link to='/'>Главная</Link>
        <BasketTool sum={select.sum} amount={select.amount} onOpen={callbacks.openModal} />

    </div>
  )
}

export default memo(MainMenu)
