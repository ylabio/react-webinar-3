export default class AuthState {
  constructor(store, name) {
    this.store = store;
    this.name = name;
    this.tokenKey = 'authToken';
    const token = localStorage.getItem(this.tokenKey);

    this.store.setState({
      ...this.store.getState(),
      [this.name]: { ...this.store.getState()[this.name], token },
    });

    if (token) {
      this.fetchProfile(); // авто-загрузка профиля
    }
  }

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
    this.store.setState(
      {
        ...this.store.getState(),
        [this.name]: { ...this.store.getState()[this.name], loading: true, error: null },
      },
      'auth: login start',
    );

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (!res.ok) throw data;

      const { token, user } = data.result;
      localStorage.setItem(this.tokenKey, token);

      this.store.setState(
        {
          ...this.store.getState(),
          [this.name]: { token, user, loading: false, error: null },
        },
        'auth: login success',
      );

      await this.fetchProfile();
    } catch (e) {
      this.store.setState(
        {
          ...this.store.getState(),
          [this.name]: {
            ...this.store.getState()[this.name],
            loading: false,
            error: e.issues?.[0]?.message || 'Ошибка',
          },
        },
        'auth: login error',
      );
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

      if (!res.ok) {
        throw new Error('Ошибка при выходе');
      }

      localStorage.removeItem(this.tokenKey);
      this.store.setState(
        {
          ...this.store.getState(),
          [this.name]: { token: null, user: null, loading: false, error: null },
        },
        'auth: logout success',
      );
    } catch (e) {
      console.error('Ошибка при выходе:', e);
    }
  }

  async fetchProfile() {
    const token = this.store.getState()[this.name].token;

    if (!token) {
      console.error('Токен не найден');
      this.store.setState(
        {
          ...this.store.getState(),
          [this.name]: {
            ...this.store.getState()[this.name],
            error: 'Токен не найден',
          },
        },
        'auth: fetch profile error (no token)',
      );
      return;
    }

    try {
      const res = await fetch('/api/v1/users/self?fields=*', {
        headers: { 'X-Token': token },
      });

      if (!res.ok) {
        throw new Error(`Ошибка запроса: ${res.statusText}`);
      }

      const user = await res.json();
      this.store.setState(
        {
          ...this.store.getState(),
          [this.name]: { ...this.store.getState()[this.name], user },
        },
        'auth: fetched profile',
      );
    } catch (e) {
      console.error('Ошибка при загрузке профиля:', e);
      this.store.setState(
        {
          ...this.store.getState(),
          [this.name]: {
            ...this.store.getState()[this.name],
            error: e.message || 'Ошибка при загрузке профиля',
          },
        },
        'auth: fetch profile error',
      );
    }
  }
}
