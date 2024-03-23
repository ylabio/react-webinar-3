import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class CommentsState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      token: localStorage.getItem("token"),
    };
  }

  /**
   * @param dateString {String}
   * @return {String}
   */

  transformDate(dateString) {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timezone: "UTC",
    };
    return new Date(Date.parse(dateString)).toLocaleString("ru", options);
  }

  /**
   * @param parent {Object}
   * @param commenText {String}
   */
}

export default CommentsState;
