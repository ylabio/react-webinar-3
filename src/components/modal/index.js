import React, { useState,useMemo} from "react";
import './style.css';
import { useModal } from "../modalContext";

function Modal({children,type}) {
    const {visible,onModalVisible} = useModal();
    // const [modalType,setModalType] = useState(type);
    
    return (
      <div className={"Modal "+ (type ? type : '') + (visible ? ' visible' : '')}>
        <div className="Modal-background" onClick = {() => onModalVisible()}></div>
        {children}
      </div>
    )
}


export default React.memo(Modal);