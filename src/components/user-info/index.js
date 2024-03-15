import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function UserInfo({user, ...content}) {
  const cn = bem('UserInfo');

  return (
    <section className={cn()} >
      <h2 className={cn('title')}>{content.title}</h2>
      <div className={cn('details')}>
        <p>{content.name}: <strong>{user.profile.name}</strong></p>
        <p>{content.phone}: <strong>{user.profile.phone}</strong></p>
        <p>email: <strong>{user.email}</strong></p>
      </div>
    </section>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object,
  content: PropTypes.object
}

UserInfo.defaultProps = {
  user: {},
  content: {}
}

export default memo(UserInfo);
