import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ProfileCard({ user }) { 
    const cn = bem('ProfileCard');
    if (!user || !user.profile) {
        console.log('Пользователь или профиль пользователя не определены');
        return null; 
    }

    console.log('ProfileCard user:', user);

    return (
        <div className={cn()}>
            <div className={cn('title')}>{'Профиль'}</div>
            <div className={cn('name')}>{"Имя: "}<span>{user.profile.name}</span></div>
            <div className={cn('phone')}>{"Телефон: "}<span>{user.profile.phone}</span></div>
            <div className={cn('email')}>{"email: "}<span>{user.profile.email}</span></div>
        </div>
    );
}

export default memo(ProfileCard);
