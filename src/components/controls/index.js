import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ setActive, sum, amount }) {
  return (
    <div className="Controls">
      <div>
        {" "}
        В корзине: {amount} / {sum} ₽{" "}
      </div>
      <button onClick={() => setActive(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
