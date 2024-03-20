import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function UserData({name, phone, email}) {

    const cn = bem('UserData');
    return (
        <div className={cn()}>
            <div className={cn('title')}>Профиль</div>
            <div className={cn('field')}>Имя:  <span className={cn('data')}>{name}</span></div>
            <div className={cn('field')}>Телефон: <span className={cn('data')}>{phone}</span></div>
            <div className={cn('field')}>email: <span className={cn('data')}>{email}</span></div>
        </div>
    )
};

UserData.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
};

export default memo(UserData);