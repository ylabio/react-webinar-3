import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import useSelector from "../../store/use-selector";
import './style.css';

function Item({item, onAdd}) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => onAdd(item._id)
  }

  const select = useSelector(state => ({
    item: state.article?.item,
    currentLanguage: state.localization.currentLanguage,
    uiElements: state.localization.uiElements,
  }));

  const getBasketAddText = useCallback(() => {
    return select.uiElements.basketAdd[select.currentLanguage];
  }, [select.currentLanguage, select.uiElements]);

  return (
    <div className={cn()}>
      <Link
        to={`/articles/${item._id}`}
        className={cn('title')}
      >
        <div>
          {item.title}
        </div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button className={cn('add-button')} onClick={callbacks.onAdd}>{getBasketAddText()}</button>
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
