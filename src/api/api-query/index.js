import {ApiClient} from "../api-сlient";

//Этот класс расширяет абстрактный ApiClient и предназначен для работы с query.rest API.
class QueryApiClient extends ApiClient {
  constructor(baseUrl) {
    super(baseUrl);
  }
}

export { QueryApiClient };
