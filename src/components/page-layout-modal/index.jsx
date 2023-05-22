import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import "./style.css";

function PageLayoutModal({ children }) {

    const cn = bem('PageLayoutModal');

    return (
        <div className={cn()}>
            {children}
        </div>
    )

}

PageLayoutModal.propTypes = {
    children: PropTypes.node
}

export default PageLayoutModal;