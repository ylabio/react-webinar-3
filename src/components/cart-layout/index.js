import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function CartLayout(props) {

  const closeCart = event => {
    if (event.target.classList.value === "CartLayout") {
      props.onOpenCart();
    }
  };

  const header = props.children[0];
  const content = props.children.slice(1);

  return (
    <div className={props.isOpened ? "CartLayout" : "CartLayout-hidden"} onClick={closeCart}>
      <div className='CartLayout-window'>
        {header}
        <div className='CartLayout-window__list'>
          {content}
        </div>
      </div>
    </div>
  );
}

CartLayout.propTypes = {
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  onOpenCart: PropTypes.func,
};

CartLayout.defaultProps = {
  onOpenCart: () => {},
};

export default React.memo(CartLayout);
