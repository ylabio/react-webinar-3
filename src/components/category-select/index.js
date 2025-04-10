import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

const CategorySelect = props => {
  const [isShowList, setIsShowList] = useState(false);
  const {
    onChange = () => {},
    categoryList = [],
    size = 'medium',
    value = {}
  } = props;
  const cn = bem('CategorySelect');

  const onSelect = (e, category) => {
    e.preventDefault();
    if (category._id === 'all') {
      onChange('');
    } else {
      onChange(category._id);
    }
    setIsShowList(prev => false);
  };

  const getCurrentItemClass = (category_id, category) => {
    return category_id === category._id ? `${cn('item')} active` : cn('item');
  };

  return (
    <div className={cn({ size })}>
      <div className={cn('item-default')} onClick={() => setIsShowList(prevIsOpen => !prevIsOpen)}>
        {value.title}
      </div>
      <ul className={isShowList ? `${cn('list')} show` : cn('list')}>
        {categoryList.map((category) => (
            <li key={category._id} onClick={e => onSelect(e, category)} className={getCurrentItemClass(value._id, category)}>
              {category.marker}{category.title}
            </li>
        ))}
      </ul>
    </div>
  );
};

CategorySelect.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      marker: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
};

export default memo(CategorySelect);
