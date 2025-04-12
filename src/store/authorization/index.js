import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      userData: {},
      isLogin: false,
      error: '',
    };
  }

  async loginUser(data) {
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      // console.log('result');
      // console.log(result);

      if (result.result) {
        localStorage.setItem('token', result.result.token);
        this.setState({
          ...this.getState(),
          userData: result.result.user,
          isLogin: true,
          error: '',
        });
      } else {
        this.setState({
          ...this.getState(),
          userData: {},
          isLogin: false,
          error: result.error.message,
        });
      }
    } catch (error) {
      console.error(this.getState());
    }
  }
}

export default AuthState;
