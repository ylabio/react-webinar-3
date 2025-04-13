import StoreModule from '../module';

import { getUserData } from '../../api';
import { LOCAL_USER_KEY } from '../../constants';

class ProfileState extends StoreModule {
  initState() {
    return {
      isAuth: false,
      userInfo: {
        name: '',
        phone: '',
        email: '',
      },
      token: '',
    };
  }

  async initParams() {
    const dataUser = JSON.parse(localStorage.getItem(LOCAL_USER_KEY));

    if (dataUser !== null && dataUser.token.length) {
      const res = await getUserData(dataUser.token, dataUser.id);

      if (res.error) {
        this.resetState()
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
      this.resetState();
    }
  }

  resetState() {
    this.setState({
      ...this.initState(),
      isAuth: false,
    });
  }
}

export default ProfileState;
