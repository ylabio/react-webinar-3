import StoreModule from '../module';
import { getFromLS } from '../../utils';

class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false,
    };
  }

  /**
   * получение данных профиля
   * @return {Promise<void>}
   */
  async getProfile() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const token = getFromLS('token');
    if (token === null) {
      return;
    }

    const response = await fetch('api/v1/users/self?fields=*', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });
    const json = await response.json();

    this.setState({
      data: json.result,
      waiting: false,
    });
  }
}

export default ProfileState;
