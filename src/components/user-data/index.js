import { memo } from 'react';
import './style.css';

function UserData({ name, phone, email }) {
  return (
    <div className="User">
      <h1>Профиль</h1>
      <div className="User-info">
        <div className="label">Имя:</div>
        <div>{name}</div>

        <div className="label">Телефон:</div>
        <div>{phone}</div>

        <div className="label">Email:</div>
        <div>{email}</div>
      </div>
    </div>
  );
}

export default memo(UserData);
