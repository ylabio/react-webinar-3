import addIndents from "./add-indents";
import datesFormat from "./dates-format";

/**
 * Форматирование комментариев
 * @returns {Array}
 */
export default function commentsFormat(comments) {
  const result = [];
  const children = [];

  comments.forEach((item) => {
    if (comments.find((node) => node._id === item.parent._id)) {
      children.unshift(item)
    } else {
      const articleComment = { ...item };
      articleComment.parent._type = 'article';

      result.push(articleComment);
    }
  });

  function putChildren(arr) {
    const restChildren = arr.filter((item) => {

      const parentIndex = result.findIndex((node) => node._id === item.parent._id)
      parentIndex >= 0 && result.splice(parentIndex + 1, 0, item);
      return parentIndex >= 0 ? 0 : 1;
    })
    if (restChildren.length) {
      return putChildren(restChildren);
    }
  }
  putChildren(children);

  const indentedComments = addIndents(result);
  const currentComments = datesFormat(indentedComments)

  return currentComments;
}
