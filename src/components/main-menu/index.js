import React from 'react'
import { Link } from 'react-router-dom'
import {cn as bem} from "@bem-react/classname"
import "./style.css"

function MainMenu(props) {
    const cn = bem('MainMenu');
    return (
        <div className={cn()}>
            <Link to= "/" className={cn("home-link")}>{props.locale.main}</Link>
        </div>
    )
}

export default MainMenu