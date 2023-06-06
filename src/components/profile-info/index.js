import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

const ProfileInfo = ({user}) => {
  const cn = bem('ProfileInfo');

  const profile = user.profile
  const name =  profile ? profile.name : ''
  const phone =  profile ? profile.phone : ''
  const email =  user.email

  return (
    <div className={cn()}>
      <h3>Профиль</h3>
      <p>Имя: <span className={cn('item')}>{name}</span></p>
      <p>Телефон: <span className={cn('item')}>{phone}</span></p>
      <p>email: <span className={cn('item')}>{email}</span></p>
    </div>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};


ProfileInfo.defaultProps = {

}

export default ProfileInfo;