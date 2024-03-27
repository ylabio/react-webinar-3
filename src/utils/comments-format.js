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

  function putChildren(arr, indent = 1) {
    const correctIndent = indent > 10? 10 : indent;
    const restChildren = arr.filter((item) => {

      const parentIndex = result.findIndex((node) => node._id === item.parent._id)
      parentIndex >= 0 && result.splice(parentIndex + 1, 0, {...item, indent: correctIndent});
      return parentIndex >= 0 ? 0 : 1;
    })
    if (restChildren.length) {
      return putChildren(restChildren, correctIndent + 1);
    }
  }
  putChildren(children);

  const currentComments = datesFormat(result)

  return currentComments;
}
