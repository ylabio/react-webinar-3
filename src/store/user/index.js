import StoreModule from '../module';

class UserState extends StoreModule {
    initState() {
        return {
            token: localStorage.getItem('token') || '',
            profile: null,
            waiting: false,
        };
    }

    async login({ login, password }) {
        this.setState({ waiting: true });

        const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });

        const result = await response.json();

        if (result?.result?.token) {
            localStorage.setItem('token', result.result.token);
            this.setState({
                token: result.result.token,
                profile: result.result.user,
                waiting: false,
            }, 'Вошли в систему');

        } else {
            // Обработка ошибок
            this.setState({ waiting: false });
            throw result.error || new Error('Auth failed');
        }
    }

    async logout() {
        await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': this.getState().token,
            },
        });

        localStorage.removeItem('token');
        this.setState({ token: '', profile: null }, 'Вышли из системы');
    }

    async loadProfile() {
        const token = this.getState().token;
        if (!token) return;

        const response = await fetch('/api/v1/users/self?fields=*', {
            headers: { 'X-Token': token },
        });

        const result = await response.json();

        this.setState({
            profile: result.result,
            waiting: false,
        }, 'Загружен профиль из АПИ');
    }
}

export default UserState;