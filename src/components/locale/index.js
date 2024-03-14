import {memo} from 'react';
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';

function Locale({lang}) {
    console.log('Locale');

    function changeLocale() {
        if (lang === 'ru') {
            return window.location.href.replace('ru', 'us');
        }
        else if (lang === 'us') {
            return window.location.href.replace('us', 'ru');
        }
    }

    return <div className='Locale'><button><Link to={changeLocale()}>{lang}</Link></button></div>
}

export default memo(Locale);