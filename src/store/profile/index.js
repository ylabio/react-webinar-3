import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      currentUser: null,
    };
  }

  loginByToken = async (token = localStorage.getItem('token')) => {
    if (!token) {
      return;
    }

    try {
      const result = await fetch(`/api/v1/users/self`, {
        headers: {
          'X-token': token,
        },
      });
      const json = await result.json();

      const {username, _id} = json.result;
      const {name} = json.result.profile;

      this.setState({
        ...this.getState(),
        currentUser: {
          username,
          name,
          id: _id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (login, password) => {
    try {
      const result = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify({
          login,
          password,
          remember: true,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const json = await result.json();

      if (result.status === 400) {
        throw new Error(json.error.data.issues[0].message);
      }

      const {token} = json.result;
      const {username, _id} = json.result.user;
      const {name} = json.result.user.profile;

      this.setState({
        ...this.getState(),
        currentUser: {
          username,
          name,
          id: _id,
        },
      });

      localStorage.setItem('token', token);

      return _id;
    } catch (error) {
      throw new Error(error);
    }
  };

  logout = async () => {
    try {
      await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'X-token': localStorage.getItem('token'),
        },
      });
      this.setState({
        ...this.getState(),
        currentUser: null,
      });
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProfileState;
