import StoreModule from "../module";

/**
 * Список всех категорий
 */
class ProfileState extends StoreModule {

  initState() {
    return {
        user: null,
        error: null,
        waiting: false
    };
  }

  async getProfile(_id) {
    this.setState({ ...this.state, waiting: true });
    const token = localStorage.getItem('token');

    const res = await fetch('/api/v1/users/' + _id + '?fields=*', {
        headers: {
            'Content-Type': 'application/json',
            'X-Token': token
        },
    });

    const json = await res.json();

    if (json.error) {
        this.setState({...this.state, waiting: false, error: json.error.data.issues});
    } else {
        this.setState({
            user: json.result,
            waiting: false,
            error: null
        });
    }
  }

}

export default ProfileState;
