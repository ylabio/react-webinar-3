import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function ProfileCard({user}) {
  return (
    <div className={'ProfileCard'}>
      <h2 className={'ProfileCard-title'}>Профиль</h2>
      <div className={'ProfileCard-description'}>Имя: <b>{user.profile?.name}</b></div>
      <div className={'ProfileCard-description'}>Телефон: <b>{user.profile?.phone}</b></div>
      <div className={'ProfileCard-description'}>email: <b>{user.email}</b></div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string
  }).isRequired,
};

export default memo(ProfileCard);
