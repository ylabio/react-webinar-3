import {memo} from 'react';
import LoginPage from '../../containers/login-page'

function Authorization() {
    // Здесь нужно выполнить отправку GET-запроса на сервер, чтобы получить данные своего профиля
    // и отобразить информацию о пользователе
    return (
      <LoginPage/>
    );
  }

  export default memo(Authorization);