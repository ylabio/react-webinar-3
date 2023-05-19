import React from "react";
import './style.css';

function Layout(props){

  return (
    <div className='Layout'>
      { props.children }
    </div>
  );
}

export default React.memo(Layout);
