import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, renderItem}) {

  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          {renderItem ? renderItem(item) : null}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  renderItem: PropTypes.func.isRequired
};

List.defaultProps = {
  renderItem: () => {}
}

export default React.memo(List);
