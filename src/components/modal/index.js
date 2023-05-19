import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({active, setActive}){
  return (
    <div className='Modal'>
      <div className='Modal-basket'>
        <button>close</button>
        корззззззина
      </div>
    </div>
  )
}

// Modal.propTypes = {
//   basket: PropTypes.arrayOf(PropTypes.shape({
//     code: PropTypes.number,
//     title: PropTypes.string,
//     price: PropTypes.number,
//     quantity: PropTypes.number
//   })).isRequired,
//   // onAddItem: PropTypes.func,
// };
//
// Modal.defaultProps = {
//   onAddItem: () => {},
// }

export default React.memo(Modal);
