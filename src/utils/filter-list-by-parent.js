export const filterListByParent = (list, parentId) => {
  const newList = [...list]
  return newList.filter(item => item.parent._id === parentId).map(item => ({
    ...item,
    replies: filterListByParent(list, item._id)
  }))
}