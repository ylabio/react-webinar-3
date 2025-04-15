import StoreModule from '../module';

class UserState extends StoreModule {
    initState() {
        return {
            token: localStorage.getItem('token') || '',
            user: null,
            authorized: false,
            waiting: false,
        };
    }

    async login({ login, password }) {
        this.setState({ waiting: true });

        const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password, remember: true }),
        });

        const result = await response.json();

        if (result?.result?.token) {
            localStorage.setItem('token', result.result.token);
            this.setState({
                token: result.result.token,
                user: {
                    _id: result.result.user._id,
                    name: result.result.user.profile.name,
                },
                authorized: true,
                waiting: false,
            }, 'Вошли в систему');

        } else {
            // Обработка ошибок
            this.setState({ waiting: false });
            throw result.error.data.issues[0] || new Error('Auth failed');
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
        this.setState({ token: '', user: null, authorized: false }, 'Вышли из системы');
    }

    async restore() {
        const token = this.getState().token;
        if (!token) return;
        await this.store.actions.profile.load();
        const profileData = this.store.getState().profile.profile;
        this.setState({
            token: token,
            user: {
                _id: profileData._id,
                name: profileData.profile.name,
            },
            authorized: true
        }, 'Восстановили сессию');
    }
}

export default UserState;