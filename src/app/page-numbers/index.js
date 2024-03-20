import "./style.css";

function PageNumber({ changePage, page, maxPage }) {
  if (maxPage < 3) {
    var pages = [1, 2, 3];
  } else {
    if (page <= 1) {
      var pages = [1, 2, 3, "...", maxPage];
    } else if (page == 2) {
      var pages = [1, 2, 3, 4, "...", maxPage];
    } else if (page + 1 == maxPage)
      var pages = [1, "...", page, page + 1];
      else if (page + 1 == maxPage - 1)
      var pages = [1, "...", page, page + 1, page + 2];
      else if (page + 1 == maxPage - 2)
      var pages = [1, "...", page, page + 1, page + 2, page + 3];
    else var pages = [1, "...", page, page + 1, page + 2, '...', maxPage];
  }

  var listItems = pages.map((number) => (
    <li
      onClick={() => {
        number == "..." ? {} : number - 1 != page ? changePage(number - 1) : {};
      }}
      className={
        number == "..." ? "Dots" : number - 1 != page ? "PageNumb" : "CurNumb"
      }
    >
      {number}
    </li>
  ));
  return (
    <div className="PageNumbers">
      {listItems}
      {maxPage <= 3 && (
        <>
          <div className="currPage">{page + 1}</div>
          {maxPage > 1 && (
            <button
              className="Numb"
              onClick={() => {
                changePage(page + 1);
              }}
            >
              {page + 2}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PageNumber;
