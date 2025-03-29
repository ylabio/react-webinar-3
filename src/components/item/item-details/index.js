import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemDetails({ price, count }) {
  const cn = bem('ItemDetails');
  return (
    <>
      {count !== undefined && (
        <td className={cn('count')}>
          {count}&nbsp;шт
        </td>
      )}
      <td className={cn('price')}>
        {price}
      </td>
    </>
  );
}

ItemDetails.propTypes = {
  price: PropTypes.string.isRequired,
  count: PropTypes.number,
};

export default React.memo(ItemDetails);
