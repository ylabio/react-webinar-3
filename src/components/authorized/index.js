import StoreModule from "../../store/module";

class AuthorizedStore extends StoreModule {

  initState() {
    return {
      authorized: false,
      waiting: false,
    }
  }

};

export default AuthorizedStore;