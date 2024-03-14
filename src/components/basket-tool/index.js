import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, t, menu: Menu, menuLinks}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Menu t={t} menuLinks={menuLinks}/>
      <span className={cn('label')}>{t.inCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: t.oneItem,
            few: t.fewItems,
            many: t.manyItems
          })} / ${numberFormat(sum)} ₽`
          : t.empty
        }
      </span>
      <button onClick={onOpen}>{t.forward}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
