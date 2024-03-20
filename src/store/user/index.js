import StoreModule from "../module";

class UserState extends StoreModule {

    initState() {
        return {
            user: null
        }
    };

    getState() {
        return this.store.getState().user
    };

    setState(newState, description = 'setState') {
        this.store.setState({
            ...this.store.getState(),
            user: newState,
        }, description);
    };
};

export default UserState;