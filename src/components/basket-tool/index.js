import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen,locale,lang}) {
  const cn = bem('BasketTool');
  
  return (
    <div className={cn()}>
      <span className={cn('label')}>{locale.inCard}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, 
            locale.pluralForms,lang
          )} / ${numberFormat(sum)} ₽`
          : `${locale.empty}`
        }
      </span>
      <button onClick={onOpen}>{locale.openModalCard}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  locale: PropTypes.shape({
      inCard: PropTypes.string.isRequired,
      empty: PropTypes.string.isRequired,
      openModalCard: PropTypes.string.isRequired,
      pluralForms: PropTypes.object.isRequired
  }).isRequired,
  lang: PropTypes.string.isRequired
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0
};

export default memo(BasketTool);
