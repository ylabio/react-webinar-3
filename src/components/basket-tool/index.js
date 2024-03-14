import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, uiElements, renderReturnButton}) {
  const cn = bem('BasketTool');  
  return (
    <div className={cn()}>
      <div className={cn('return')}>
        {renderReturnButton()}
      </div>      
      <span className={cn('cartInfo')}>
        <span className={cn('label')}>{`${uiElements.inCart}:`}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(
                amount, 
                uiElements.countables
              )} / ${numberFormat(sum)} ₽`
            : uiElements.empty
          }
        </span>      
        <button className={cn('open-button')} onClick={onOpen}>{uiElements.open}</button>
      </span>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  uiElements: PropTypes.shape({
    inCart: PropTypes.string,
    empty: PropTypes.string,
    countables: PropTypes.string,
    open: PropTypes.string,
  }),
  renderReturnButton: PropTypes.func,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  renderReturnButton: () => {},
}

export default memo(BasketTool);
