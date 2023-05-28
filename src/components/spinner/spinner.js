import React from 'react';
import Portal from "../portal";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Spinner() {
  const cn = bem('Spinner');

  return (
    <Portal>
      <div className={cn()}/>
    </Portal>
  )
}

export default Spinner;
