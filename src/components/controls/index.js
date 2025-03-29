import React from "react";
import "./style.css"
import icon from './icon.svg';
import { pageLayoutClass } from "../page-layout";

const defaultControlsProps = {
  sumBasket: ()=>{},
  toggleModal: ()=>{}
};

function Controls( { sumBasket = defaultControlsProps.sumBasket, toggleModal = defaultControlsProps.toggleModal}  ) {
  return (
    <div className={ pageLayoutClass( "controls" ) }>
      <button onClick={ ()=>{
        if ( sumBasket() !== "Пусто") {
          return toggleModal()
        }
      } }><img src={ icon } alt="icon"/> { sumBasket() }</button>
    </div>
  )
}

export default React.memo( Controls );
