import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import Navigation from "../navigation";

function BasketTool(props) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>      
      <Navigation  getTranslation={props.getTranslation} language={props.language}/>
      <span className={cn('label')}>{props.getTranslation('IN_THE_BASKET', props.language)}:</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${props.language === 'ru' ? 
            plural(props.amount, {one:'товар', few:'товара', many:'товаров'}, 'ru-RU') :
            plural(props.amount, {one:'product', other: 'products'}, 'en-EN')} 
          / ${numberFormat(props.sum)} ₽`
          : `${props.getTranslation('EMPTY', props.language).toLowerCase()}`
        }
      </span>
      <button onClick={props.onOpen}>{props.getTranslation('GO', props.language)}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string,
  getTranslation: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => {},
  getTranslation: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
