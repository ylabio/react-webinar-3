import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, renderItem, noBorder}) {
  const cn = bem('List');
  return (
    <div className={cn()}>
      {list.map((item) => (
        <div
          key={item._id}
          className={cn('item', {'no-border': noBorder})}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: () => {},
  noBorder: false,
};

export default memo(List);
