import StoreModule from "../module";

/**
 * Список всех категорий
 */
class AuthState extends StoreModule {

  initState() {
    return {
        isLogged: null,
        user: null,
        token: '',
        error: null,
        waiting: false
    };
  }

  async login(data) {
    console.log(data);
    this.setState({ ...this.state, waiting: true });
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
            ...this.state,
            isLogged: false,
            error: json.error.data.issues,
            waiting: false
        });

        //return Promise.reject();
        return
    }

    const { token, user } = json.result;
    localStorage.setItem('token', token);
    this.setState({
        isLogged: true,
        token,
        user,
        waiting: false,
        error: ''
    });

    //return Promise.resolve();
  }

    async auth() {
        this.setState({ ...this.state, waiting: true });
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({ ...this.state, waiting: false, isLogged: false });
            return
        }

        const res = await fetch('/api/v1/users/self', {
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token
            },
        });

        const json = await res.json();

        if (json.error) {
            this.setState({...this.state, waiting: false, isLogged: false});
            localStorage.removeItem('token');
        } else {
            this.setState({
                isLogged: true,
                token,
                user: json.result,
                waiting: false,
                error: null
            });
        }
    }

    async logout() {
        this.setState({ ...this.state, waiting: true });
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({ ...this.state, waiting: false, isLogged: false });
            return
        }

        const res = await fetch('/api/v1/users/self', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': token
            },
        });

        const json = await res.json();

        localStorage.removeItem('token');
        this.setState({...this.state, waiting: false, isLogged: false});
    }

    async openLogin() {
        this.setState({ ...this.state, error: null });
    }
}

export default AuthState;
