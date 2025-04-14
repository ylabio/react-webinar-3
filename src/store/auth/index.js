export default class AuthState {
  constructor(store, name) {
    this.store = store;
    this.name = name;
    this.tokenKey = 'authToken';
  }

  /**
    Начальное состояние модуля
   */
  initState() {
    const token = localStorage.getItem(this.tokenKey);
    return {
      token,
      user: null,
      error: null,
      loading: false,
    };
  }

  async login(login, password) {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: {
        ...this.store.getState()[this.name],
        loading: true,
        error: null,
      },
    });

    try {
      console.log('login:', login);
      console.log('password:', password);
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (!res.ok) throw data;

      const { token, user } = data.result;
      localStorage.setItem(this.tokenKey, token);

      if (!user) {
        this.store.setState({
          ...this.store.getState(),
          [this.name]: {
            ...this.store.getState()[this.name],
            token,
            loading: false,
            error: null,
          },
        });

        await this.fetchProfile();
        return true;
      }

      // если user пришёл — сохраняем всё сразу
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          token,
          user,
          loading: false,
          error: null,
        },
      });

      return true;
    } catch (e) {
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          loading: false,
          error: e.issues?.[0]?.message || 'Ошибка входа: неверный логин или пароль',
        },
      });
      return false;
    }
  }

  async logout() {
    const token = this.store.getState()[this.name].token;

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (!res.ok) throw new Error('Ошибка при выходе');

      localStorage.removeItem(this.tokenKey);
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          token: null,
          user: null,
          loading: false,
          error: null,
        },
      });
    } catch (e) {
      console.error('Ошибка при выходе:', e);
    }
  }

  async fetchProfile() {
    const token = this.store.getState()[this.name].token;

    if (!token) {
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          error: 'Токен не найден',
        },
      });
      return;
    }

    try {
      const res = await fetch('/api/v1/users/self?fields=*', {
        headers: { 'X-Token': token },
      });
      if (!res.ok) throw new Error(`Ошибка: ${res.statusText}`);

      const response = await res.json();
      const user = response.result;

      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          user,
        },
      });
    } catch (e) {
      this.store.setState({
        ...this.store.getState(),
        [this.name]: {
          ...this.store.getState()[this.name],
          error: e.message || 'Ошибка загрузки профиля',
        },
      });
    }
  }
}
