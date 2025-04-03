import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import useSelector from '../../store/use-selector';
import { messages } from '../../messages';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;
  const select = useSelector(state => ({
          lang: state.inter.lang,
        }));

  const cn = bem('BasketTool');
  const one = messages[select.lang].items.one;
  const few = messages[select.lang].items.few;
  const many = messages[select.lang].items.many;
  const empty = messages[select.lang].empty; 

  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: one,
                few: few,
                many: many,
              })} / ${numberFormat(sum)} ₽`
            : empty}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
