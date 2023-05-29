import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {useTranslation} from "../../locales";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const {t} = useTranslation();
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('itemsCart')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:t('productPlural').one, few: t('productPlural').few, many: t('productPlural').many})} / ${numberFormat(sum)} ₽`
          : t('empty')
        }
      </span>
      <button onClick={onOpen}>{t('next')}</button>
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
