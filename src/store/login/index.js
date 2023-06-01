import StoreModule from "../module";

export const BASE_URL = "/api/v1/";

class LoginState extends StoreModule {
  initState() {
    return {
      errorMessage: "",
      isUserLoading: true,
    };
  }

  async fetch(url, { body, headers, ...params }) {
    const res = await fetch(BASE_URL + "users/" + url, {
      headers: new Headers({ "content-type": "application/json", ...headers }),
      body: JSON.stringify(body),
      ...params,
    });
    const resJson = await res.json();
    if (resJson.error?.message) {
      this.setError(resJson.error.message);
    }
    return resJson;
  }

  setError(err) {
    this.setState({ ...this.getState(), errorMessage: err });
  }

  setUser({ token, user }) {
    window.localStorage.setItem("token", token);
    this.setState({ ...this.getState(), user });
    location.reload();
  }
  async getUser() {
    const token = window.localStorage.getItem("token");
    let state;
    if (token) {
      this.setState({ ...this.getState(), isUserLoading: true });
      const userRes = await this.fetch("self", {
        headers: { "X-Token": token },
      });
      state = { user: userRes.result };
    }
    return this.setState({
      ...this.getState(),
      ...state,
      isUserLoading: false,
    });
  }

  async signIn(fields) {
    if (!fields.login.length || !fields.password.length)
      return this.setError("login.error.notEmpty");

    const res = await this.fetch("sign", { body: fields, method: "POST" });
    if (res.result?.token) {
      const { token, user } = res.result;
      this.setUser({ token, user });
    }
  }
  async signOut() {
		const token = localStorage.getItem('token')
		await this.fetch("sign", {method: 'DELETE', headers: {'X-Token': token}});
    window.localStorage.removeItem("token");
    location.replace("/");
  }
}

export default LoginState;
