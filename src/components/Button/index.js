import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';

const Button = (props) => {
    return (
        <div className='Button'>
            <Link to={props.link} onClick={props.onLeave}>
                <button>{props.title}</button>
            </Link>
        </div>
    )
}

export default Button
