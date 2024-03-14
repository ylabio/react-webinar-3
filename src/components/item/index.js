import {memo, useCallback, useContext} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { LanguageContext } from "../../languageContext";
import jsonText from './text.json'

function Item(props) {

  const [language, setLanguage] = useContext(LanguageContext)

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),

    closeModal: () => props.onClose(),
  }

  const text = jsonText;

  return (
    <div className={cn()}>
      <Link to={`/articles/${props.item._id}`} onClick={() => callbacks.closeModal()} className={cn('link')}>
        <div className={cn('title')}>{props.item.title}</div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{text[language]}</button>
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
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
