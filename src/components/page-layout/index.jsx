import React from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function PageLayout({children}) {
    const cn = bem("PageLayout");

    return (
        <div className={cn()}>
           <div className={cn("center")}>
                {children}
           </div>
        </div>    
    )
}

export default PageLayout;