import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import NavMenu from "../nav-menu";
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, langData}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <NavMenu langData={langData} />
      <div>
        <span className={cn('label')}>{langData.basket.inCart}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, langData.basket.variants)} / ${numberFormat(sum)} ₽`
            : `${langData.basket.tools}`
          }
        </span>
        <button onClick={onOpen}>{langData.buttons.onOpenTxt}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  langData: PropTypes.object,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
