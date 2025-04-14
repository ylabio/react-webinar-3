import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";


function UserCard({ user, t = text => text }) {
  const cn = bem('UserCard');

  return (
    <div className={cn()}>
      <h1>{t('user.profile')}</h1>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('user.name')}</div>
          <div className={cn('value')}>{user.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('user.phone')}</div>
          <div className={cn('value')}>{user.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>email:</div>
          <div className={cn('value')}>{user.email}</div>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    })
  }),
  t: PropTypes.func
};

export default memo(UserCard);