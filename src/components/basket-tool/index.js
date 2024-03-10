import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { NavLink } from "react-router-dom";
import useSelector from "../../store/use-selector";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');

  const { locale } = useSelector(state => ({
    locale: state.i18n.locale
  }))

  return (
    <div className={cn()}>
      <NavLink className={cn('link')} to='/'>{locale.Main}</NavLink>
      <div>
        <span className={cn('label')}>{locale.In_cart}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: locale.product.one,
              few: locale.product.few,
              many: locale.product.many
            })} / ${numberFormat(sum)} ₽`
            : locale.empty
          }
        </span>
        <button onClick={onOpen}>{locale.Navigate}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
