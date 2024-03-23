import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, renderItem, theme}) {

  const cn = bem('List');
  
  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item._id} className={cn('item', {theme: theme})}>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  theme: PropTypes.string
};

List.defaultProps = {
  renderItem: (item) => {
  },
  theme: ''
}

export default memo(List);
