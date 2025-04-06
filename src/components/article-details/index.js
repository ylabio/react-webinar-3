import { memo } from 'react';
import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from '../../utils';

const ArticleDetails = ({ item }) => {
  const cn = bem('ArticleDetails');
  return (
    <div className={cn()}>
      <p className={cn('description')}>{item?.description}</p>
      <table className={cn('table')} cellpadding="5" cellspacing="0">
        <tr>
          <td>Страна производитель:</td>
          <td>
            <b>
              {item.madeIn?.title} ({item.madeIn?.code})
            </b>
          </td>
        </tr>
        <tr>
          <td>Категория:</td>
          <td>
            <b>{item.category?.title}</b>
          </td>
        </tr>
        <tr>
          <td>Год выпуска:</td>
          <td>
            <b>{item?.edition}</b>
          </td>
        </tr>
      </table>
      <div className={cn('price')}>
        <b>Цена: {numberFormat(item?.price)} ₽</b>
      </div>
    </div>
  );
};
ArticleDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
};
export default memo(ArticleDetails);
