import React, {useState} from "react";
import PropTypes from 'prop-types';
import Cart from "../cart";
import "./style.css";

function Controls(){
  const [open, setOpen] = useState(false);

  const openWindow = () => {
    setOpen(!open);
  };

  return (
    <div className='Controls'>
      <button onClick={openWindow}>Перейти</button>
      {open && (
        <Cart openWindow={openWindow}/>
      )}
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
