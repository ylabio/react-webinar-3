import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import { CarlSVG } from "../icons";

const ControlsDefaultProps = {
  label: "Пусто",
  onShowCart: () => {},
  addedItem: false,
};

function Controls( {
                     label = ControlsDefaultProps.label,
                     onShowCart = ControlsDefaultProps.onShowCart,
                     addedItem = ControlsDefaultProps.addedItem,
                   } ) {

  const cn = bem( "Controls" );

  return (
    <div className={ cn() }>
      <button className={ cn( "button", { selected: addedItem } ) } onClick={ () => onShowCart() }>
        <CarlSVG/>
        { label }
      </button>
    </div>
  );
}

Controls.propTypes = {
  onShowCart: PropTypes.func,
  label: PropTypes.string,
  addedItem: PropTypes.bool,
};

export default React.memo( Controls );
