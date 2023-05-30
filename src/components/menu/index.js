import {useCallback} from 'react'
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import BasketTool from "../basket-tool";
import Nav from "../nav";
import useStore from "../../store/use-store";
import useLang from '../../i18n/use-lang';
import 'styles.css';

function Menu() {

  const store = useStore();

  const {t} = useLang()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }
  return (
    <div className='Menu'>
      <Nav translate={t}/>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        sum={select.sum}
        amount={select.amount}
        translate={t}
      />
    </div>
  );
}

Menu.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translate: PropTypes.func,
};

Menu.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  translate: () => null,
};

export default Menu;
