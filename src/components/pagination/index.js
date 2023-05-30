import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import createPageList from "./create-pages";
import "./style.css";
import { Link } from 'react-router-dom';

function Pagination({ currentPage, pagesCount, path }) {
  const cn = bem("Pagination");
  const pageList = createPageList({ currentPage, pagesCount });

  return (
    <div className={cn()}>
      {pageList.map((page) => {
        if (page === "...") {
          return <span key={page + Math.random()}>{page}</span>;
        }
        return (
          <Link
            to={{pathname: path, search: `page=${page}`}}
            key={page}
            className={cn("button", { active: currentPage === page })}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  pagesCount: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
  path: PropTypes.string,
}

Pagination.defaultProps = {
  pagesCount: 1,
  currentPage: 1,
  path: '/',
}

export default memo(Pagination);
