import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onSelectItem }) {
  return (
    <table className="List">
      <tbody>
        {list.map(item => (
          <Item
            item={{ ...item, count: null }}
            controls={(
              <button onClick={() => onSelectItem(item.code)}>Добавить</button>
            )}
            key={item.code}
            className="List-item"
          />
        ))}
      </tbody>
    </table>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onSelectItem: () => {},
};

export default React.memo(List);
