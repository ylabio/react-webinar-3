import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ user }) {

    if (!user) return null;

    const cn = bem('ProfileCard');
    return (
        <div className={cn()}>
            <h2 className={cn('title')}>Профиль</h2>
            <div className={cn('prop-wrapper')}>
                <div className={cn('prop')}>
                    <div className={cn('label')}>Имя:</div>
                    <div className={cn('value')}>{user.profile.name}</div>
                </div>
                <div className={cn('prop')}>
                    <div className={cn('label')}>Телефон:</div>
                    <div className={cn('value')}>{user.profile.phone}</div>
                </div>
                <div className={cn('prop')}>
                    <div className={cn('label')}>Email:</div>
                    <div className={cn('value')}>{user.email}</div>
                </div>
            </div>
        </div>
    );
}

ProfileCard.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profile: PropTypes.shape({
            name: PropTypes.string,
            phone: PropTypes.string,
        }),
    }),
};

export default memo(ProfileCard);
