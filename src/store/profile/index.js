import StoreModule from '../module';

import { getUserData } from '../../api';
import { LOCAL_USER_KEY } from '../../constants';

class ProfileState extends StoreModule {
  initState() {
    return {
      isAuth: false,
      isClickLogOutBtn: false,
      userInfo: {
        name: '',
        phone: '',
        email: '',
      },
      token: '',
    };
  }

  async initParams() {
    const userToken = localStorage.getItem(LOCAL_USER_KEY);

    if (userToken !== null) {
      const res = await getUserData(userToken);

      if (res.error) {
        this.resetState();
        this.resetLocalStore();
      } else {
        this.setState({
          ...this.getState(false),
          isAuth: true,
          isClickLogOutBtn: false,
          userInfo: {
            name: res.result.profile.name,
            phone: res.result.profile.phone,
            email: res.result.email,
          },
          token: userToken,
        });
      }
    } else {
      this.resetState();
    }
  }

  resetLocalStore() {
    localStorage.removeItem(LOCAL_USER_KEY);
  }

  resetState() {
    this.setState({
      ...this.initState(),
      isAuth: false,
      isClickLogOutBtn: true,
    });
  }
}

export default ProfileState;
