import React from "react";
import "./style.css"

function ItemsPerPageSelect( { onChange } ) {
  return (
    <select onChange={ ( e ) => onChange( Number( e.target.value ) ) }
            defaultValue={ 5 }
            className="items-per-page-select">
      <option value={ 5 }>5</option>
      <option value={ 10 }>10</option>
      <option value={ 20 }>20</option>
    </select>
  );
}

export { ItemsPerPageSelect };
