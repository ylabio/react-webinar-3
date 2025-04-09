import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

function ArticleCard(props) {
  const cn = bem('ArticleCard');

  const callbacks = {
    onAdd: () => props.onAdd(props.article._id),
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.article.description}</p>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          <span className={cn('title')}>{props.text.country}: </span>
          <span className={cn('text')}>{props.country}</span>
        </li>
        <li className={cn('item')}>
          <span className={cn('title')}>{props.text.category}: </span>
          <span className={cn('text')}>{props.category}</span>
        </li>
        <li className={cn('item')}>
          <span className={cn('title')}>{props.text.edition}: </span>
          <span className={cn('text')}>{props.article.edition}</span>
        </li>
      </ul>
      <h2 className={cn('price')}>
        {props.text.price}: {props.article.price} ₽
      </h2>
      <Button style="primary" onClick={callbacks.onAdd} title={props.text.button} />
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
  }),
  text: PropTypes.shape({
    price: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.string,
    button: PropTypes.string,
  }),
  country: PropTypes.string,
  category: PropTypes.string,
  onAdd: PropTypes.func,
};

export default memo(ArticleCard);
