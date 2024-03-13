import {memo} from "react";
import './style.css';

function LoaderWrapper (props) {
  return (
    <div className='Loader'>
      {props.isLoading ? (<div className='Loader-text'>{props.language.loading}...</div>) : (<div>{props.children}</div>)}
    </div>
  )
}

export default memo(LoaderWrapper );
