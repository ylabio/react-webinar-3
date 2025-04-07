import React, { memo } from "react"
import "./style.css"

function ItemDetailHeader({children}){
    return(
        <div className="ItemPage-main">
            {children}
        </div>
    )
}

export default memo(ItemDetailHeader)