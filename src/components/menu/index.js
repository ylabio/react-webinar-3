import { Link } from "react-router-dom";
import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { locale } from "../../locale";

function Menu({href, lang}) {

    const cn = bem('Menu');

    return <div className={cn()}><Link to={href}>{locale[lang].links.mainPage}</Link></div>;
}

Menu.propTypes = {
    href: PropTypes.string,
}

export default memo(Menu);