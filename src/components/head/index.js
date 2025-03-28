import React from "react";
import "./style.css"
import { pageLayoutClass } from "../page-layout";

function Head( { title } ) {
  console.log(2)
  return (
    <div className={pageLayoutClass( "head" )}>
      <h1>{ title }</h1>
    </div>
  )
}

export default React.memo(Head)
