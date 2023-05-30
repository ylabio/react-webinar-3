function createPageList({ pagesCount, currentPage }) {

    const maxInRow = 5;
    const pagesList = [];

    if (pagesCount <= maxInRow) {
      for (let i = 1; i <= pagesCount; i++) {
        pagesList.push(i);
      }
      return pagesList
    }

    if (currentPage < maxInRow - 1) {
      for (let i = 1; i < maxInRow; i++) {
        pagesList.push(i);
      }
      pagesList.push('...', pagesCount);
      return pagesList;
    }

    if (currentPage > 3 && !(pagesCount - currentPage < 3)) {
      pagesList.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pagesCount )
      return pagesList
    }

    if (pagesCount - currentPage < maxInRow) {
      pagesList.push(1, '...');
      for (let i = (pagesCount - 3); i <= pagesCount; i++) {
        pagesList.push(i);
      }
      return pagesList
    }

    return pagesList
}

export default createPageList;
