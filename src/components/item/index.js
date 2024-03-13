import {memo, useContext} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {LanguageContext} from "../../language-provider.js";


function Item({item, onNavigate, onAdd}) {

  const cn = bem('Item');

  const { wordsTranslate } = useContext(LanguageContext);

  const callbacks = {
    onAdd: (e) => onAdd(item._id),
    onLink: (e) => onNavigate(item._id),
  }

  return (
    <div className={cn()}>
      <div className={cn('title')} onClick={callbacks.onLink}>
          {item.title}
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
  onNavigate: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onNavigate: () => {},
}

export default memo(Item);
