import StoreModule from "../module";

class Pagination extends StoreModule {
  initState() {
    return {
      selectedPage: 1,
      paginationArray: [1],
    };
  }

  generatePagination(articles, limit) {
    let currentPage = this.getState().selectedPage;
    let totalPages = Math.floor(articles / limit);
    if (articles % limit !== 0) {
      totalPages++;
    }
    let delta = 1;
    let extra = 0;
    if ((currentPage === 1) || (currentPage === totalPages)) extra = 1;
    let range = [];

    for (
      let i = Math.max(2, currentPage - delta - extra);
      i <= Math.min(totalPages - 1, currentPage + delta + extra);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta - extra > 2) {
      range.unshift("blank");
    }
    if (currentPage + delta + extra < totalPages - 1) {
      range.push("blank");
    }

    range.unshift(1);
    if (totalPages !== 1) range.push(totalPages);
    this.setState(
      {
        ...this.getState(),
        paginationArray: range,
      },
      "Опреление страниц пагинации"
    );
  }

  selectPage(pageNumber) {
    this.setState(
      {
        ...this.getState(),
        selectedPage: pageNumber,
      },
      "Переход на страницу"
    );
  }
}

export default Pagination;
