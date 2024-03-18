import {memo} from 'react'
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

const ProfileCard = ({data}) => {

  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
        <div className={cn('info-container')}>
          <p className={cn('info-text')}>Имя:</p>
          <span className={cn('info-text_bold')}>{data.profile?.name}</span>
        </div>
        <div className={cn('info-container')}>
          <p className={cn('info-text')}>Телефон:</p>
          <span className={cn('info-text_bold')}>{data.profile?.phone}</span>
        </div>
        <div className={cn('info-container')}>
          <p className={cn('info-text')}>email:</p>
          <span className={cn('info-text_bold')}>{data.email}</span>
        </div>
    </div>
  )
}

ProfileCard.propTypes = {
  data: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }),
};

export default memo(ProfileCard)