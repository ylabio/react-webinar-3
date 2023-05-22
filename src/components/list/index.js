import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, ListItem, onItemAction }) {
  const callbacks = {
    onItemAction,
  };

  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn('item')}>
          <ListItem item={item} onClick={callbacks.onItemAction} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  ListItem: PropTypes.object.isRequired,
  onItemAction: PropTypes.func,
};

export default React.memo(List);
