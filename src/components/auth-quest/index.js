import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";

function AuthQuest(props) {

    const cn = bem('AuthQuest')

    return (
        <div className={cn()}>
            <Link to={props.link.profile} className={cn('link')}>Войдите</Link>, чтобы иметь возможность {
            props.isTypeComment ? 'ответить' : 'комментировать'
        }
        </div>
    )
}

AuthQuest.PropTypes = {}

export default React.memo(AuthQuest);