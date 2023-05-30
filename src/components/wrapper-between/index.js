import { memo } from 'react';
import './style.css';

function WrapperBetween({children}){
  return <div className='Wrapper_between'>
    {children}
  </div>
}

export default memo(WrapperBetween)