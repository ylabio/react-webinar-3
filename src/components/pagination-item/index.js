import { memo } from "react";
import "./style.css"

function PaginationItem({ number, changePage, selected }) {
    return (
        <div
            onClick={() => changePage(number * 10 - 10)}
            className={selected ? "PaginationItem selected" : "PaginationItem"}>
            {number}
        </div>
    )
}

PaginationItem.defaultProps = {
    changePage: () => {},
    selected: false
  }

export default memo(PaginationItem)