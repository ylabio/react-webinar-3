import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ handleClick = ()=>{}, styles, title,children },props) {

  return (
    <div className={styles}>
      <button {...props} onClick={handleClick}>{children}{title}</button>
    </div>
  );
};

Controls.propTypes = {
  handleClick: PropTypes.func,
  styles: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

// Controls.defaultProps = {
//   onAdd: () => {},
// };

export default React.memo(Controls);
