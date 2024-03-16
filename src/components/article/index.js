import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Article({articleId, item, onAdd, articleText}) {
  
  const cn = bem('Article');

  const callbacks = {
    onAdd: (e) => onAdd(articleId)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('made')}>{articleText.madeIn}: <b>{item.madeIn}</b></div>
      <div className={cn('category')}>{articleText.category}: <b>{item.category}</b></div>
      <div className={cn('edition')}>{articleText.edition}: <b>{item.edition}</b></div>
      <div className={cn('price')}>{articleText.price}: {item.price} {articleText.currency}</div>
      <button onClick={callbacks.onAdd}>{articleText.itemAddButtonText}</button>
    </div>
  );
}

Article.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  articleText: PropTypes.shape({
    currency: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.string,
    price: PropTypes.string,
    itemAddButtonText: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func
};

Article.defaultProps = {
  onAdd: () => {}
}

export default memo(Article);
