import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function UserCard(props) {
  const cn = bem('UserCard');
  const {user} = props
  return (<>
      {user && <div className={cn()}>
        <h2>{props.t('profile')}</h2>
        <p>{props.t('name')}:<span>{user.profile?.name}</span></p>
        <p>{props.t('phone')}:<span>{user.profile?.phone}</span></p>
        <p>email:<span>{user?.email}</span></p>
      </div>}
    </>

  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
    email: PropTypes.string.isRequired,
  }),
};

UserCard.defaultProps = {
  onAdd: () => {
  },
  t: (text) => text
}

export default memo(UserCard);
