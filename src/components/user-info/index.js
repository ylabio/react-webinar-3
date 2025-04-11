import useSelector from '../../hooks/use-selector';

import './style.css';

function UserInfo() {
  const select = useSelector(state => ({
    userData: state.user.userInfo,
  }));

  return (
    <div className="UserInfo">
      <h2>Профиль</h2>
      <div className="UserInfo-container">
        <div className="UserInfo-text">
          <span className="UserInfo-category">Имя:</span>
          <span className="UserInfo-description">{select.userData.name}</span>
        </div>
        <div className="UserInfo-text">
          <span className="UserInfo-category">Телефон:</span>
          <span className="UserInfo-description">{select.userData.phone}</span>
        </div>
        <div className="UserInfo-text">
          <span className="UserInfo-category">Email:</span>
          <span className="UserInfo-description">{select.userData.email}</span>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
