import StoreModule from "../module";

/**
 * Список всех категорий
 */
class AuthState extends StoreModule {

  initState() {
    return {
        user: null,
        token: '',
        error: '',
        waiting: false
    };
  }

  async login(data) {
    console.log(data);
    this.setState({ ...this.initState(), waiting: true });
    const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
        this.setState({
            error: json.error.message,
            waiting: false
        });

        return Promise.reject();
    }

    const { token, user } = json.result;
    localStorage.setItem('token', token);
    this.setState({
        token,
        user,
        waiting: false,
        error: ''
    });

    return Promise.resolve();
  }

    async auth() {
        const token = localStorage.getItem('token');
        if (!token) return

        const res = await fetch('/api/v1/users/self', {
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token
            },
        });

        const json = await res.json();

        if (json.error) {
            localStorage.removeItem('token');
        } else {
            this.setState({
                token,
                user: json.result,
                waiting: false,
                error: ''
            });
        }
    }

    async logout() {
        const token = localStorage.getItem('token');
        if (!token) return

        const res = await fetch('/api/v1/users/self', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token
            },
        });

        const json = await res.json();
        
        localStorage.removeItem('token');
        this.setState(this.initState());
    }
}

export default AuthState;
