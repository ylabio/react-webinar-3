import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formattedNumber } from "../../utils";
import { cn as bem } from "@bem-react/classname";

const CartBottomPanelDefaultProps = {
  total: 0,
};



function CartBottomPanel( { total = CartBottomPanelDefaultProps.total } ) {

  const cn = bem( "CartBottomPanel" );

  return (
    <div className={cn()}>
      <b className={ cn("title") }>Итого:</b>
      <b className={ cn("price") }>{ formattedNumber( total ) } ₽</b>
    </div>
  );
}

CartBottomPanel.propTypes = {
  total: PropTypes.number.isRequired,
};


export default React.memo( CartBottomPanel );
