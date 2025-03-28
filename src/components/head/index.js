import React from "react";
import "./style.css"
import { pageLayoutClass } from "../page-layout";

function Head( { title } ) {
  return (
    <div className={ pageLayoutClass( "head" ) }>
      <h1>{ title }</h1>
    </div>
  )
}

export default React.memo( Head )
