import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({ list, action, actionTitle }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} action={action} actionTitle={actionTitle} />
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
  action: PropTypes.func,
  actionTitle: PropTypes.string,
};

List.defaultProps = {
  action: () => {},
};

export default React.memo(List);
