import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import locales from '../../locales';
import useSelector from '../../store/use-selector';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;

  const select = useSelector(state => ({
    language: state.lang.language,
  }));

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, locales[select.language].products)} / ${numberFormat(sum)} ₽`
            : locales[select.language].empty}
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
