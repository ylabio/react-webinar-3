import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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

MainMenu.propTypes = {
    locale: PropTypes.shape({
        main: PropTypes.string.isRequired // Определяем, что locale.main должен быть строкой и обязательным
    }).isRequired // Обязательное свойство locale объекта и должно быть строкой
};

export default MainMenu