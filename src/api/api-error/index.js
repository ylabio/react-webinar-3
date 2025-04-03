
//Этот класс наследует от стандартного Error и используется для обработки ошибок API.
class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ApiError";
  }
}

export {ApiError}
