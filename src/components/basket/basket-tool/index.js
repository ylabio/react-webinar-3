import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from "react";
import useLanguage from "../../../localization/use-language";
import { numberFormat, plural } from "../../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const ln = useLanguage();
  const words = ln('topStatsGoods');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{ln('topStatsLabel')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one: words[0], few: words[1], many: words[2]})} / ${numberFormat(sum)} ₽`
          : ln('empty')
        }
      </span>
      <button className={cn('go')} onClick={onOpen}>{ln('topToBasket')}</button>
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
