import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import { CarlSVG } from "../../icons";

const ControlsDefaultProps = {
  label: "Пусто",
  onShowCart: () => {},
  AddedAnimation: false,
};

function Controls( {
                     label = ControlsDefaultProps.label,
                     onShowCart = ControlsDefaultProps.onShowCart,
                     AddedAnimation = ControlsDefaultProps.AddedAnimation,
                   } ) {

  const cn = bem( "Controls" );

  const onClick = () => onShowCart();

  return (
    <div className={ cn() }>
      <button className={ cn( "button", { selected: AddedAnimation } ) } onClick={ onClick }>
        <CarlSVG/>
        { label }
      </button>
    </div>
  );
}

Controls.propTypes = {
  onShowCart: PropTypes.func,
  label: PropTypes.string,
  AddedAnimation: PropTypes.bool,
};

export default React.memo( Controls );
