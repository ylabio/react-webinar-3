import { memo } from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../store/use-selector';
import './style.css';

function List({ list: propList, renderItem = item => {} }) {
  const listFromStore = useSelector(state => state.catalog.list);
  const list = propList || listFromStore;

  return (
    <ul className="List">
      {list.map(item => (
        <li key={item._id} className="List-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  renderItem: PropTypes.func,
};

export default memo(List);
