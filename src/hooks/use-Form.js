import { ChangeEvent, useState } from "react";

/**
 *Пользовательский хук собирающий данные введённые в инпуты.
 *
 * @param {T} inputValues входные значения формы
 * @returns {FormHookResult<T>}
 * * state Объект значений с формы
 * * handleChanges Берет введенные данные с инпута (необходимо указать в атрибуте)
 * * isMessage Флаг для отображения сообщения
 * * showMessage Функция для показа сообщения
 * * setState Функция для обновления состоя, например сброса всех полей формы
 * @example
 * type User = {name: string, password: string}
 * useForm<User>({name: '', password: ''})
 */
const useForm = (inputValues) => {
  const [state, setState] = useState(inputValues);

  /**
   * Функция получения данных с импутов и сброс сообщения с результатом запроса
   * @param {ChangeEvent<HTMLInputElement>} e объект события
   * @returns {void}
   */
  const handleChanges = (e) => {
    const inputValue = { ...state, [e.target.name]: e.target.value };
    setState(inputValue);
  };
  /**
   * Меняет флаг для отображения сообщения
   * @returns {void}
   */
  return [state, handleChanges];
};

export default useForm;
