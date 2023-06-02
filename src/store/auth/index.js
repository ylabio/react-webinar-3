import StoreModule from "../module";
import {getAuthToken, saveAuthToken} from "../../utils";

class AuthState extends StoreModule {

  initState() {
    return {
      loginWaiting: false,
      isAuth: false,
      loginError: null,
      userName: null,
      logoutWaiting: false,

      isAuthCheckWaiting: true,
    };
  }

  async reset() {
    this.setState({
      ...this.getState(),
      loginError: null,
    })
  }

  async isAuthCheck() {
    this.setState({
      ...this.getState(), isAuthCheckWaiting: true
    })

    const response = await fetch('/api/v1/users/self', {
      headers: {
        "Content-Type": "application/json",
        "X-Token": getAuthToken() ?? ""
      }
    })

    const json = await response.json();

    let userName = null;
    let isAuth = false;

    if (response.status === 200) {
      userName = json.result?.profile?.name;
      isAuth = true;
    }

    this.setState({
      ...this.getState(),
      isAuthCheckWaiting: false,
      userName,
      isAuth
    })
  }

  async login(credential) {
    this.setState({
      ...this.getState(), loginWaiting: true
    })

    const response = await fetch('/api/v1/users/sign', {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      body: JSON.stringify(credential),
    })


    const json = await response.json();

    let loginError = null;
    let isAuth = false;
    let userName = null;

    if (response.status === 200) {
      saveAuthToken(json.result.token);
      isAuth = true;
      userName = json?.result?.user?.profile?.name;
    } else {
      if (json?.error?.message) {
        loginError = `${json?.error?.message}! ${json?.error?.data?.issues?.map(error => error.message).join(', ')}`;
      } else {
        loginError = 'unknown or network error';
      }

    }

    this.setState({
      ...this.getState(),
      loginWaiting: false,
      loginError,
      isAuth,
      userName
    })
  }

  async logout() {
    this.setState({
      ...this.getState(),
      logoutWaiting: true
    })

    const token = getAuthToken();

    const response = await fetch('/api/v1/users/sign', {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token
      },
      method: 'delete',
    })

    const json = await response.json();

    let isAuth = this.getState().isAuth;
    let userName = this.getState().userName;

    if (response.status === 200) {
      isAuth = false;
      userName = null
    }

    this.setState({
      ...this.getState(),
      logoutWaiting: false,
      isAuth,
      userName
    })
  }

}

export default AuthState;
