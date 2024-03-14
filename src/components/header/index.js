import Head from "../head";
import { memo } from "react";
import PropTypes from "prop-types";
import "style.css";
import { cn as bem } from "@bem-react/classname";

function Header({left, right, dark}) {

    const cn = bem('Header');

    return (
        <div className={'Header' + (dark ? ' Header_dark' : '')}>
            <div className={cn('left')}>{left}</div>
            <div className={cn('right')}>{right}</div>
        </div>
    )
}

Header.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
    dark: PropTypes.bool,
}

export default memo(Header);