import StoreModule from '../module';

import { getUserData } from '../../services';
import { LOCAL_USER_KEY } from '../../constants';

class UserState extends StoreModule {
  initState() {
    return {
      isAuth: false,
      userInfo: {
        name: '',
        phone: '',
        email: '',
      },
      token: '',
      isUserLeave: false,
    };
  }

  async initParams() {
    const dataUser = JSON.parse(localStorage.getItem(LOCAL_USER_KEY));

    if (dataUser !== null && dataUser.token.length) {
      const res = await getUserData(dataUser.token, dataUser.id);

      if (res.error) {
        this.resetState(false);
      } else {
        this.setState({
          ...this.getState(false),
          isAuth: true,
          isUserLeave: false,
          userInfo: {
            name: res.result.profile.name,
            phone: res.result.profile.phone,
            email: res.result.email,
          },
          token: dataUser.token,
        });
      }
    } else {
      this.resetState(false);
    }
  }

  resetState(isUserLoggedOut = false) {
    this.setState({
      ...this.initState(),
      isAuth: false,
      isUserLeave: isUserLoggedOut,
    });
  }
}

export default UserState;
