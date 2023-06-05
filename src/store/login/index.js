import StoreModule from "../module";

export const BASE_URL = "/api/v1/";

class LoginState extends StoreModule {
  initState() {
    return {
      errorMessage: "",
    };
  }

  async fetch(url, { body, headers, ...params }) {
    const res = await fetch(BASE_URL + "users/" + url, {
      headers: new Headers({ "content-type": "application/json", ...headers }),
      body: JSON.stringify(body),
      ...params,
    });
    const resJson = await res.json();
		const errMess = resJson.error?.data.issues[0].message;
    if (errMess) {
      this.setError(errMess);
    }
    return resJson;
  }

  setError(err) {
    this.setState({ ...this.getState(), errorMessage: err });
  }

  setUser({ token, user }) {
    window.localStorage.setItem("token", token);
    this.store.actions.profile.setState({ ...this.getState(), user });
    location.reload();
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
		this.store.actions.profile.setState({...this.getState(), user: undefined})
  }
}

export default LoginState;