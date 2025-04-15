import StoreModule from '../module';
import useStore from '../../hooks/use-store';

class ProfileState extends StoreModule {
  initState() {
    return {
      userData: {},
      isLoading: false,
    };
  }

  async profileLoad() {
    if (localStorage.getItem('token')) {
    try {
      this.setState({...this.getState(), isLoading: true}, 'profileLoad');
      const res = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      const result = await res.json();

      if (result.result) {
        this.setState({
          ...this.getState(),
          userData: result.result,
          isLoading: false
        }, 'Успешный profileLoad');
      } else {
        localStorage.removeItem('token');
        this.setState({
          ...this.getState(),
          userData: {},
          isLoading: false
        }, 'Ошибка profileLoad');
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля');
    }} else {
      this.setState({
        ...this.getState(),
        userData: {},
        isLogin: false,
      }, 'Токен отсутсвует profileLoad');
    }
  }
}

export default ProfileState;
