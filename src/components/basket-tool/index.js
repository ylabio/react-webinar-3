import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Menu from '../menu';
import Cart from '../../assets/icon/cart.svg';
import useTranslation from '../../hooks/use-translation';
import './style.css';

function BasketTool({ onOpen, amount, sum, menuItems }) {
  const cn = bem('BasketTool');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <Menu items={menuItems} />
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
          {amount > 0 ? `${numberFormat(amount)} ${plural(amount, {
            one: t('item_one'),
            few: t('item_few'),
            many: t('item_many'),
            other: t('item_other')
          })} / ${numberFormat(sum)} ₽` : t('empty')}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default memo(BasketTool);
