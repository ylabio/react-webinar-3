import StoreModule from "../module";

class Profile extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false,
      error: null,
    };
  }

  async load(token) {
    this.setState(
      { ...this.getState(), waiting: true, error: null },
      "Загрузка профиля"
    );

    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": `${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        this.setState(
          { ...this.getState(), data: json.result, waiting: false },
          "Профиль загружен"
        );
      } else {
        const json = await response.json();
        const errors = json.error.data.issues
          ?.map((error) => error.message)
          .join(", ");
        this.setState(
          { ...this.getState(), error: errors, waiting: false },
          "Профиль не загружен"
        );
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: "Произошла ошибка",
        waiting: false,
      });
    }
  }
}

export default Profile;
