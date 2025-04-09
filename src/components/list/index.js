import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ children }) {
  return (
    <ul className="List">
      {children?.map(child => (
        <li key={child.key} className="List-item">
          {child}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element
  ),
};

export default memo(List);
