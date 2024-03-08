import React from "react";
import {cn as bem} from '@bem-react/classname';
import Head from "../head/index";
import Button from "../button/index"
import './style.css';

function Modal({children , title, callbacks}){
  const cn = bem('Modal');
  return (
     <div className={cn()}>
       <div className={cn('overlay')}>
        <div className={cn('titleRow')}>
          <Head title={title}/>
          <Button callback={callbacks.onCloseCart}  title='Закрыть'/>
        </div>
          {children}
       </div>
     </div>

  )
}

export default Modal;