import {memo} from 'react';
import './style.css';

function NotFoundPage() {
  
    return (
        <h1 className='NotFoundPage'>Такой страницы нет.</h1>
    );
  }
  
  export default memo(NotFoundPage);