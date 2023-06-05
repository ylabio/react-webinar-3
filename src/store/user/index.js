import StoreModule from "../module";

/**
 * Состояние пользователя
 */
class User extends StoreModule {
  initState() {
    return {
      info: {},
      waiting: false
    };
  }

  async fetchInfo() {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.setState({
      ...this.getState(),
      waiting: true
    })
    const res = await fetch("/api/v1/users/self", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });

    const json = await res.json();
    if(json.error) {
      localStorage.removeItem('token')
      this.setState({
        ...this.getState(),
        info: {},
        waiting: false
      })
      return
    }

    this.setState({
      ...this.getState(),
      info: {
        id: json.result._id,
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
      },
      waiting: false
    })
  }
}

export default User;
