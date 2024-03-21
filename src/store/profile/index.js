import StoreModule from "../module";

class ProfileState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: null,
      error: "",
      waiting: false,
    };
  }

  async setProfile(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      let response = await fetch(
        `/api/v1/users/${id}?fields=_id,email,profile(name,phone)`,
        {
          method: "GET",
          headers: {
            "X-Token": token,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.data.issues[0].message);
      }
      this.setState({
        ...this.getState(),
        data: data.result,
        error: "",
        waiting: false,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
        data: null,
      });
    }
  }
}

export default ProfileState;
