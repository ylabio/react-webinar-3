import StoreModule from "../module";


class ProfileState extends StoreModule {
    initState() {
      return {
        data: {},
        waiting: false,
        error: null
      }
    }

    async load() {
      this.setState({...this.getState(), error: null, waiting: true})
      const response = await fetch('/api/v1/users/self', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      if (response.status === 403) {
        this.setState({...this.getState(), waiting: false, data: {}});
        this.store.actions.session.clear();
      }
      if (response.status === 200) {
        this.setState({...this.getState(), data: json.result, waiting: false})
      }

    }
}

export default ProfileState;
