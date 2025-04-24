import StoreModule from '../module';
// import simplifyErrors from '../../utils/simplify-errors';

/**
 * Сессия
 */
class CommentsState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      waiting: false,
    };
  }

  /**
   * Загрузка списка комментариев
   */
  async getCommentsById(id) {
    this.setState({ ...this.getState(), waiting: true }, 'Ожидание загрузки категорий');

    const res = await this.services.api.request({
      url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
    });
    // Товар загружен успешно
    this.setState(
      {
        ...this.getState(),
        data: res.data.result.items,
        waiting: false,
      },
      'Комментарии загружены',
    );
  }
}

export default CommentsState;
