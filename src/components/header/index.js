import Head from "../head";
import { memo } from "react";
import PropTypes from "prop-types";
import "style.css";
import { cn as bem } from "@bem-react/classname";

function Header({left, right}) {

    const cn = bem('Header');

    return (
        <div className={cn()}>
            <div className={cn('left')}>{left}</div>
            <div className={cn('right')}>{right}</div>
        </div>
    )
}

Header.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
}

export default memo(Header);