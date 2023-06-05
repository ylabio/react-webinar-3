import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      user: undefined,
      isLoading: true,
    };
  }

  async getUser() {
    const token = window.localStorage.getItem("token");
    let state;
    if (token) {
      this.setState({
        ...this.getState(),
        isLoading: true,
      });
      const userRes = await fetch("/api/v1/users/self", {
        headers: { "X-Token": token, "content-type": "application/json" },
      });
			const {result: user} = await userRes.json()
      state = { user };
    }
    this.setState({
      ...this.getState(),
      ...state,
      isLoading: false,
    });
  }
}

export default ProfileState;