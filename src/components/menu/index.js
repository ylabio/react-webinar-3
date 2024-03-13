import { Link } from "react-router-dom";
import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Menu({href}) {

    const cn = bem('Menu');

    return <div className={cn()}><Link to={href}>Главная</Link></div>;
}

Menu.propTypes = {
    href: PropTypes.string,
}

export default memo(Menu);