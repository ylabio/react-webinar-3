import React from "react";
import PropTypes from "prop-types"
import "./style.css"
import icon from './icon.svg';
import { pageLayoutClass } from "../page-layout";

function Controls( { onAdd } ) {

  console.log(1)

  return (
    <div className={pageLayoutClass("controls")}>
      <button onClick={ () => onAdd() }> <img src={icon} alt="icon"/> Пусто</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onAdd: () => {}
};

export default React.memo(Controls);
