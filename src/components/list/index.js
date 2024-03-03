import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, onAction, actionText}) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.length > 0 ? (
        list.map(item => (
          <div key={item.code} className={cn('item')}>
            <Item 
              item={item}
              onAction={onAction}
              actionText={actionText}/>
          </div>
        ))
      ) : (
        <div className={cn('empty')}>Пока здесь ничего нет</div>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAction: PropTypes.func,
  actionText: PropTypes.string,
};

List.defaultProps = {
  onAction: () => {
  },
}

export default React.memo(List);
