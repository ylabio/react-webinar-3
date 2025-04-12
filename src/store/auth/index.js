import StoreModule from '../module';
import { deleteFromLS, getFromLS, saveToLS } from '../../utils';

class AuthState extends StoreModule {
  initState() {
    return {
      user: [],
      token: getFromLS('token') || null,
      errorMessage: '',
      waiting: false,
    };
  }

  setErrorMessage(error) {
    const message = error.data?.issues[0].message || error.message;
    this.setState({
      ...this.getState(),
      errorMessage: message,
    });
  }

  setWaiting(waiting) {
    this.setState({
      ...this.getState(),
      waiting,
    });
  }

  async login(payload, navigate = () => {}) {
    try {
      this.setWaiting(true);
      const response = await fetch('api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (json.error) {
        this.setErrorMessage(json.error);
        this.setWaiting(false);
      } else {
        const token = json.result.token;
        saveToLS('token', token);

        this.setState({
          ...this.getState(),
          user: json.result.user,
          token,
          waiting: false,
        });
        this.resetErrorMessage();
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
      this.setWaiting(false);
    }
  }

  async me() {
    try {
      const token = getFromLS('token');
      if (token === null) {
        return;
      }
      this.resetErrorMessage();
      this.setWaiting(true);
      const response = await fetch('api/v1/users/self?fields=*', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      const json = await response.json();
      if (json.error) {
        this.setErrorMessage(json.error);
        this.setWaiting(false);
      } else {
        this.setState({
          ...this.getState(),
          user: json.result,
          token,
          waiting: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setWaiting(false);
    }
  }

  async logout() {
    try {
      this.setWaiting(true);
      const token = getFromLS('token');
      const response = await fetch('api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      const json = await response.json();
      if (json.result) {
        deleteFromLS('token');
        this.setState({
          ...this.initState(),
        });
      }
      console.log(json);
    } catch (error) {
      console.log(error);
      this.setWaiting(false);
    } finally {
      this.setWaiting(false);
    }
  }

  resetErrorMessage() {
    this.setState({
      ...this.getState(),
      errorMessage: '',
    });
  }
}

export default AuthState;
