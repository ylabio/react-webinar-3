import StoreModule from "../module";
import {getAuthToken, saveAuthToken} from "../../utils";

class AuthState extends StoreModule {

  initState() {
    return {
      loginWaiting: false,
      isAuth: false,
      loginError: null,
      user: null,
      logoutWaiting: false,

      isAuthCheckWaiting: true,
    };
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

    let user = null;
    let isAuth = false;

    if (response.status === 200) {
      user = json.result;
      isAuth = true;
    }

    console.log(json);


    this.setState({
      ...this.getState(),
      isAuthCheckWaiting: false,
      user,
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
    let user = null;

    if (response.status === 200) {
      // console.log('success', json);
      saveAuthToken(json.result.token);
      isAuth = true;
      user = json.result.user;
    } else {
      if (json?.error?.message) {
        console.log(json, json?.error?.data?.issues);
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
      user
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
    let user = this.getState().isAuth;

    if (response.status === 200) {
      isAuth = false;
      user = null
    }

    this.setState({
      ...this.getState(),
      logoutWaiting: false,
      isAuth,
      user
    })
  }

}

export default AuthState;
