import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      profile: null,
      waiting: false,
      error: "",
    };
  }

  async fetchProfile() {
    try {
      this.setState({ ...this.getState(), waiting: true, error: "" });

      const token = this.store.getState().auth.token;

      if (!token) {
        return;
      }

      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      this.setState({
        ...this.getState(),
        profile: data.result,
        error: "",
        waiting: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message, waiting: false });
    }
  }
}

export default ProfileState;
