import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function ProfileCard({t, user}) {

    const cn = bem('ProfileCard');

    return (
        <div className={cn()}>
            <div className={cn('field')}><h2><b>{t('profile.profile')}</b></h2></div>
            <div className={cn('field')}>{t('profile.name')}: <b>{user.profile.name}</b></div>
            <div className={cn('field')}>{t('profile.phone')}: <b>{user.profile.phone}</b></div>
            <div className={cn('field')}>{t('profile.email')}: <b>{user.email}</b></div>
        </div>
    )
}

export default memo(ProfileCard);