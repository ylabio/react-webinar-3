import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Details({onAdd}) {
  return (
    <div className='Details'>
      <p>Свойства товара</p>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}

Details.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

Details.defaultProps = {
  onAdd: () => {},
}

export default memo(Details);
