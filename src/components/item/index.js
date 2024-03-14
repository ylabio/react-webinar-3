import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function Item({item, onAdd, link, uiElements}) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => onAdd(item._id)
  }

  return (
    <div className={cn()}>
      <Link
        to={link}
        className={cn('title')}
      >
        <div>
          {item.title}
        </div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button className={cn('add-button')} onClick={callbacks.onAdd}>{uiElements.addText}</button>
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
  uiElements: PropTypes.shape({
    addText: PropTypes.string,
  }),
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
