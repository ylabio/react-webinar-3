import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from '../../utils';
import Button from '../button';

function ItemDescription({ item, onAdd = () => {} }) {
  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className="ItemDescription">
      <span>{item.description}</span>
      <div className="ItemDescription-info-container">
        <div className="ItemDescription-info">
          <span>Страна производитель:</span>
          <span>Категория:</span>
          <span>Год выпуска:</span>
        </div>

        <div className="ItemDescription-info">
          <span>
            <b>
              {item.madeIn.title} ({item.madeIn.code})
            </b>
          </span>
          <span>
            <b>{item.category.title}</b>
          </span>
          <span>
            <b>{item.edition}</b>
          </span>
        </div>
      </div>
      <span className="ItemDescription-price">
        <b>Цена: {numberFormat(item.price)} ₽</b>
      </span>

      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
    </div>
  );
}

ItemDescription.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(ItemDescription);
