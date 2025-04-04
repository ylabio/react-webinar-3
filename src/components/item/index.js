import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import LanguageContext from '../language-provider';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import './style.css';

function Item({ item, onAdd = () => {} }) {
  const { language, translations } = useContext(LanguageContext);

  return (
    <div className="Item">
      <Link to={`/articles/${item._id}`}>
        <h4 className="Item-title">{item.title}</h4>
      </Link>
      <div className="Item-actions">
        <div className="Item-price">{numberFormat(item.price)} ₽</div>
        <Button
          style="primary"
          onClick={() => onAdd(item._id)}
          title={translations[language].addButton}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default Item;
