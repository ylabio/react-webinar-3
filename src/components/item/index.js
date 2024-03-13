import {memo} from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import { useTranslation } from "../../utils/useTranslition";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }
    const t = useTranslation();
  return (
    <div className={cn()}>
      <div className={cn('title')}>
              {props.linkComponent ? (
                  props.linkComponent(props.item)
              ) : (
                      <Link to={props.linkUrl}>
                      {props.item.title}
                  </Link>
              )}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
              <button onClick={callbacks.onAdd}>{t('addItem')}</button>
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
