import { memo, useMemo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './style.css';
import ruTranslations from '../../translations/ru.json';
import enTranslations from '../../translations/en.json';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  const language = props.lang === 'ru' ? ruTranslations : enTranslations;

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')} to={props.link} onClick={props.onLink}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {language['basket.unit']}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{language['basket.delete']}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  link: PropTypes.string,
  onLink: propTypes.func,
  lang: propTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => { },
  onLink: () => { },
  lang: 'ru'
}

export default memo(ItemBasket);
