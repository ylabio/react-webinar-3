import StoreModule from '../module';

class ProfileState extends StoreModule {
    initState() {
        return {
            profile: null,
            waiting: false,
        };
    }

    async load(id = 'self') {
        this.setState({ waiting: true });

        const token = this.store.getState().user.token;
        const response = await fetch(`/api/v1/users/${id}?fields=*`, {
            headers: { 'X-Token': token },
        });

        const result = await response.json();

        this.setState({
            profile: result.result,
            waiting: false,
        }, 'Загружен профиль из АПИ');
    }

    async clear() {
        this.setState({ profile: null, waiting: false }, 'Очистили профиль');
    }
}

export default ProfileState;