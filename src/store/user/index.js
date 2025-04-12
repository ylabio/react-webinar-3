import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      token: '',
      user: { profile: { name: '' } },
      isAuth: false,
    };
  }

  async login(form) {
    let response;
    let result;
    try {
      response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      result = (await response.json()).result;
      this.setState(
        {
          ...this.getState(),
          ...result,
          isAuth: true,
        },
        'Логин',
      );
    } catch (e) {}
  }

  async logout() {
    let response;
    let result;
    try {
      response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': '6c17ddecd82fd1701b6b9423ce5606056674bed888598e38dd2624c51c8b1268',
        },
      });
      result = await response.json();

      if (Object.hasOwnProperty(result, 'error')) throw new Error(result);

      this.setState(
        {
          ...this.initState(),
        },
        'Выход',
      );
    } catch (e) {}
  }
}

export default UserState;
