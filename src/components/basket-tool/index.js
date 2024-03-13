import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import { Link } from "react-router-dom";
import './style.css';
import { useTranslate } from "../../translate";

function BasketTool({sum, amount, onOpen,url}) {
  const {translate,language}=useTranslate()
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
  
      <div>
         <span className={cn('label')}>{translate('inTheBasket')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: translate('product'),
            few: 'товара',
            many: 'товаров',
            other:translate('products')
          },language)} / ${numberFormat(sum)} ₽`
          : translate('empty')
        }
      </span>
     <Link to={url}><button onClick={onOpen}>{translate('goCart')}</button>
     </Link> 
      </div>
     
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
