import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Button( props ) {

  const onClick = () => {
    props.onClick();
  }
  
  return (
    <>
      <button  className='Button' onClick={onClick}>{props.title}</button>
    </>
  )
}

// Controls.propTypes = {
//   onClick: PropTypes.func,
//   title: PropTypes.string
// };

// Controls.defaultProps = {
//   onClick: () => {}
// }

export default React.memo(Button);
