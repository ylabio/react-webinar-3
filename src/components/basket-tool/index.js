import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';

function BasketTool({
  onOpen,
  sum = 0,
  amount = 0,
  textone = '',
  textfew = '',
  textmany = '',
  textEmpty = '',
}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: textone,
                few: textfew,
                many: textmany,
              })} / ${numberFormat(sum)} ₽`
            : textEmpty}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  texts: PropTypes.shape({
    main: PropTypes.string,
    one: PropTypes.string,
    few: PropTypes.string,
    many: PropTypes.string,
    Empty: PropTypes.string,
  }),
};

export default memo(BasketTool);
