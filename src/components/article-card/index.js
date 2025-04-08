import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import Button from '../button';
import './style.css';
import { KEYS } from '../../constants';

function ArticleCard({item, onAdd = () => {} , labels}) {
  const cn = bem('ArticleCard');
  const callbacks = {
    onAdd: () => {
      console.log('item._id',item._id);
      onAdd(item._id);
    },
  };

  const renderInfoField = (label, value) => (
    <>
      <p className={cn('label')}>{label}:</p>
      <b className={cn('value')}>{value}</b>
    </>

  );


  return (
    <div className={cn()}>
      <p>{item.description}</p>

      <div className={cn('info')}>
        {renderInfoField(labels.country, `${item.madeIn.title} (${item.madeIn.code})`)}
        {renderInfoField(labels.category, item.category.title)}
        {renderInfoField(labels.releaseYear, item.edition)}
      </div>

      <span className={cn('price')}>{labels.price}:&nbsp;&nbsp;{numberFormat(item.price)} ₽</span>

      <Button style="primary" onClick={callbacks.onAdd} title={labels.buttonAdd}/>
    </div>
  );
}

ArticleCard.propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      edition: PropTypes.number.isRequired,
      madeIn: PropTypes.shape({
        title: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }).isRequired,
      category: PropTypes.shape({
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }).isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
  onAdd: PropTypes.func,
  labels: PropTypes.shape({
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    buttonAdd: PropTypes.string.isRequired,
       }).isRequired,
};

export default memo(ArticleCard);
