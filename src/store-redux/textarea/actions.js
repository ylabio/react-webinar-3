export default {
  /**
   * Открытие формы по названию
   * @param name
   */
  open: (name) => {
    return {type: 'textarea/open', payload: {name}};
  },

  /**
   * Закрытие формы
   * @param name
   */
  close: () => {
    return {type: 'textarea/close'}
  }
}
