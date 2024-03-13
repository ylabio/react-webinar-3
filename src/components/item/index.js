import {memo, useContext} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {LanguageContext} from "../../language-provider.js";


function Item({item, link, onAdd}) {

  const cn = bem('Item');

  const linkProduct = link ? link : item._id;

  const { wordsTranslate } = useContext(LanguageContext);

  const callbacks = {
    onAdd: (e) => onAdd(item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/articles/${linkProduct}`}>
          {item.title}
        </Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{wordsTranslate("buttonAdd")}</button>
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
