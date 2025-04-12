import React, { memo, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import SelectIcon from '../../assets/icon/select-icon.svg';

import './style.css';

const CategorySelect = props => {
  const [isShow, setIsShow] = useState(false);

  const { onChange = x => {}, categoryList = [], size = 'medium', value = {} } = props;
  const cn = bem('CategorySelect');

  const onSelect = (e, category) => {
    e.preventDefault();

    onChange(category._id === 'all' ? '' : category._id);

    setIsShow(prev => false);
  };

  const getCurrentItemClass = (category_id, category) => {
    return category_id === category._id ? `${cn('item')} active` : cn('item');
  };

  const checkEvent = e => {
    let parentSelect = e.target.closest(`div.${cn('item-default')}`);

    if (parentSelect === null) {
      setIsShow(prev => false);
    }

    return;
  };

  useEffect(() => {
    document.addEventListener('click', e => checkEvent(e), false);

    return document.removeEventListener('click', e => checkEvent(e), false);
  }, []);

  return (
    <div className={cn({ size })}>
      <div className={`${cn('item-default')}`} onClick={() => setIsShow(prev => !prev)}>
        {value.title}
        <SelectIcon className={isShow ? cn('icon-open') : cn('icon')} />
      </div>
      {isShow && (
        <ul className={cn('list')}>
          {categoryList.map(category => (
            <li
              key={category._id}
              onClick={e => onSelect(e, category)}
              className={getCurrentItemClass(value._id, category)}
            >
              {category.marker}{category.title}
            </li>
          ))}
        </ul>
      )}
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
