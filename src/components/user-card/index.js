import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function UserCard(props) {
  const cn = bem('UserCard');
  const {user} = props
  return (<>
      {user && <div className={cn()}>
        <h2>Профиль</h2>
        <p>Имя:<span>{user.profile?.name}</span></p>
        <p>Телефон:<span>{user.profile?.phone}</span></p>
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
    }).isRequired,
    email: PropTypes.string.isRequired,
  }),
};

UserCard.defaultProps = {
  onAdd: () => {
  },
  t: (text) => text
}

export default memo(UserCard);
