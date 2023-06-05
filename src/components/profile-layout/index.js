import React from 'react';
import './style.css';

const ProfileLayout = ({name, number, mail, t}) => {
    return (
        <div className='ProfileLayout'>
            <h2>{t('profile.profile')}</h2>

            <p>{t('profile.name')}: <b>{name}</b></p>
            <p>{t('profile.phone')}: <b>{number}</b></p>
            <p>{t('profile.email')}: <b>{mail}</b></p>
        </div>
    )
}

export default ProfileLayout
