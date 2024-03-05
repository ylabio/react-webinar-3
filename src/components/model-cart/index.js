import React from "react";
import "./style.css";


function ModelCart ({children}){ 
    return (
        <div className="modal">
            <div className="modal-wrapper">
                 <div className="modal-content">
                    {children}
                 </div>
            </div>
       </div>        
    )
}

export default React.memo(ModelCart);