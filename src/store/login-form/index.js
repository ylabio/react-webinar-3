import StoreModule from "../module";


class LoginFormState extends StoreModule {
  initState() {
    return {
      fields: {
        login: "",
        password: ""
      },
      waiting: false,
      error: null
    }
  }

  init() {
    this.setState({fields: {login: "", password: ""}, error: null})
  }

  async submit() {
    this.setState({...this.getState(), error: null, waiting: true});

    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify(this.getState().fields),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (json.error) {
      console.log(json.error);
      this.setState({...this.getState(), error: json.error.data.issues, waiting: false});
    } else {
      this.setState({fields: { login: "", password: ""}, waiting: false, error: null });
      this.store.actions.session.setSession(json.result.user, json.result.token);
    }

    return response.status;
  }
  changeField(key, value) {
    const newState = {...this.getState()};
    newState.fields[key] = value;
    this.setState(newState);
  }

}

export default LoginFormState;
