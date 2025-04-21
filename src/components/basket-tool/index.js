import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import useTranslate from "../../hooks/use-translate";

function BasketTool(props) {
  const { sum = 0, amount = 0, onOpen = () => {} } = props;

  const cn = bem('BasketTool');
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
            : t('basket.empty')}
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
