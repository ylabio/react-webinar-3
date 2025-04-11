import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      userData: {},
      isAuth: false,
      token: null,
    };
  }
}


export default UserState;
