import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import './style.css';
import {useLanguage} from '../../translation/language-context';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;
  const cn = bem('BasketTool');
  const {translation} = useLanguage();

  return (
    <div className={cn()}>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: translation['basket-tool.product'],
                few: translation['basket-tool.products'],
                many: translation['basket-tool.productss'],
              })} / ${numberFormat(sum)} ₽`
            : translation['basket-tool.clear.title']}
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
