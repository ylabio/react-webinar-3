import React, { memo } from "react";
import 'style.css'
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';

function LogoutBtn(props) {
    const cn = bem('LogoutBtn')

    return (
        <div className={cn()}>
            <button className={cn('logout')} onClick={props.signOut}>{props.title}</button>
        </div>
    )
}

LogoutBtn.propTypes = {
    title: PropTypes.string,
}
LogoutBtn.defaultProps = {
    signOut: () => {}
}

export default memo(LogoutBtn)