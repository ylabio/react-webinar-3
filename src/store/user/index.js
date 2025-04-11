import StoreModule from '../module';

import { getUserData } from '../../services';

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
    };
  }

  async initParams() {
    const dataUser = JSON.parse(localStorage.getItem('user-auth'));

    if (dataUser !== null && dataUser.token.length) {
      const res = await getUserData(dataUser.token, dataUser.id);

      if (res.error) {
        this.resetState();
      } else {
        this.setState({
          ...this.getState(),
          isAuth: true,
          userInfo: {
            name: res.result.profile.name,
            phone: res.result.profile.phone,
            email: res.result.email,
          },
          token: dataUser.token,
        });
      }
    }
  }

  resetState() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default UserState;
