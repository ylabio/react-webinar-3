import React from "react";
import PropTypes from "prop-types"
import "./style.css"
import icon from './icon.svg';
import { pageLayoutClass } from "../page-layout";

function Controls( { sumBasket, toggleModal } ) {
  return (
    <div className={ pageLayoutClass( "controls" ) }>
      <button onClick={ toggleModal }><img src={ icon } alt="icon"/> { sumBasket() }</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo( Controls );
