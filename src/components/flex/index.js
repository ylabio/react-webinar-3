import React, { memo } from "react";
import './style.css';

function Flex({ children }) {
  return(
    <>
      <div className='flex-align-center'>
        {children}
      </div>
    </>
  )
}

export default memo(Flex);
