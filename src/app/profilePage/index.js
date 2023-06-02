import {memo} from 'react';
import UserPage from '../../containers/user-page'

function ProfilePage() {
    // Здесь нужно выполнить отправку GET-запроса на сервер, чтобы получить данные своего профиля
    // и отобразить информацию о пользователе
  
    return (
      <UserPage/>
    );
  }

  export default memo(ProfilePage);