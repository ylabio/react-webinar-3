import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    // const token = localStorage.getItem('token');
    // const isAuth = localStorage.getItem('isAuth');
    return {
      // isAuth: Boolean(isAuth),
      error: null,
      wait: false,
      profile: {
        name: '',
        email: '',
        phone: '',
      }
    };
  }

  // async checkToken() {
  //   if (!localStorage.getItem('token')) return null;
  //   try {
  //     const response = await fetch(`/api/v1/users/self?fields=_id,profile(name)`, {
  //       method: 'GET',
  //       headers: {
  //         'content-type': 'application/json',
  //         'X-Token': this.getState().token,
  //       },
  //     });
  //     const json = await response.json();
  //
  //     if (!response.ok) {
  //       this.setState(
  //         {
  //           ...this.getState(),
  //           // isAuth: false,
  //           token: '',
  //         },
  //         '',
  //       );
  //       localStorage.setItem('token', '');
  //       // localStorage.setItem('isAuth', '');
  //       throw new Error('Токен авторизации устарел')
  //     }
  //
  //     this.setState(
  //       {
  //         ...this.getState(),
  //         profile: {
  //           ...this.getState().profile,
  //           name: json.result.profile.name,
  //         },
  //       },
  //       '',
  //     );
  //
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  //
  // }
  //
  // async login(email, password) {
  //   this.setState(
  //     {
  //       ...this.getState(),
  //       error: null,
  //       authWait: true,
  //       // isAuth: false,
  //     },
  //     '',
  //   );
  //
  //   try {
  //     const response = await fetch(`/api/v1/users/sign?fields=email,profile(name,phone)`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         login: email,
  //         password: password,
  //       }),
  //     });
  //
  //     const json = await response.json();
  //
  //     if (!response.ok) {
  //       const error = json.error.data.issues.map((issue) => issue.message)
  //       this.setState(
  //         {
  //           ...this.getState(),
  //           error: error,
  //           authWait: false,
  //         },
  //         '',
  //       );
  //       throw new Error(error.join(', '));
  //     }
  //
  //     this.setState(
  //       {
  //         ...this.getState(),
  //         token: json.result.token,
  //         // isAuth: true,
  //         authWait: false,
  //         profile: {
  //           name: json.result.user.profile.name,
  //         }
  //       },
  //       'Токен получен успешно',
  //     );
  //     localStorage.setItem('token', json.result.token);
  //     // localStorage.setItem('isAuth', true+'');
  //
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  //
  // }
  //
  // async logout() {
  //   try {
  //     const response = await fetch(`/api/v1/users/sign?fields=_id,profile(name)`, {
  //       method: 'DELETE',
  //       headers: {
  //         'content-type': 'application/json',
  //         'X-Token': this.getState().token,
  //       },
  //     });
  //
  //     const json = await response.json();
  //
  //     if (!response.ok) {
  //       const error = json.error.data.issues.map((issue) => issue.message)
  //       throw new Error(error.join('; '));
  //     }
  //
  //     this.setState(
  //       {
  //         ...this.getState(),
  //         token: '',
  //         profile: {},
  //         // isAuth: false,
  //       },
  //       'Выход успешно выполнен',
  //     );
  //
  //     localStorage.setItem('token', '');
  //     // localStorage.setItem('isAuth', '');
  //
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // }

  async loadProfile(token = '', id = 'self') {
    try {
      const response = await fetch(`/api/v1/users/${id}?fields=_id,email,profile(name,phone)`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'X-Token': token,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        const error = json.error.data.issues.map((issue) => issue.message)
        throw new Error(error.join('; '));
      }

      this.setState(
        {
          ...this.getState(),
          profile: {
            ...this.getState().profile,
            name: json.result.profile.name,
            email: json.result.email,
            phone: json.result.profile.phone,
          },
        },
        'Выход успешно выполнен',
      );
    } catch (e) {
      console.error(e.message);
    }
  }

  // async resetError() {
  //   this.setState(
  //     {
  //       ...this.getState(),
  //       error: null,
  //     },
  //     'Ошибка сброшена',
  //   );
  // }

}

export default UserState;
