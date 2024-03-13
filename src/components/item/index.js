import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';
import ruTranslations from '../../translations/ru.json';
import enTranslations from '../../translations/en.json';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  const language = props.lang === 'ru' ? ruTranslations : enTranslations;


  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link className={cn('link')} to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{language["article.add"]}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  link: PropTypes.string,
  lang: PropTypes.string
};

Item.defaultProps = {
  onAdd: () => { },
  lang: 'ru'
}

export default memo(Item);
