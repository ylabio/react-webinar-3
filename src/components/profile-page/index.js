// Вывести ошибки
import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfilePage(props) {
  const cn = bem('ProfilePage');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('item')}>
        Имя:&nbsp;<span className={cn('bold')}>{props.name}</span>
      </div>
      <div className={cn('item')}>
        Телефон:&nbsp;<span className={cn('bold')}>{props.phone}</span>
      </div>
      <div className={cn('item')}>
        email:&nbsp;<span className={cn('bold')}>{props.email}</span>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

export default memo(ProfilePage);
