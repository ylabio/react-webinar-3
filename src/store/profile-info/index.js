import StoreModule from '../module';

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ProfileInfoState extends StoreModule {
  initState() {
    return {
      profileData: {},
    };
  }

  loadProfile = async () => {
    try {
      const result = await fetch(`/api/v1/users/self`, {
        headers: {
          'X-token': localStorage.getItem('token'),
        },
      });
      const json = await result.json();

      const {username, email, _id} = json.result;
      const {name, phone} = json.result.profile;

      this.setState({
        ...this.getState(),
        profileData: {
          username,
          email,
          name,
          phone,
          id: _id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default ProfileInfoState;
