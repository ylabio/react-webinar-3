import React from "react";
import { cn as bem } from "@bem-react/classname";
import { paginationBuilder } from "../../utils";

function Paginator({ currentPage, itemsTotal, pageSize }) {
  const cn = bem("Paginator");
  const pagination = paginationBuilder(currentPage, itemsTotal, pageSize);

  return (
    <div className={cn()}>
      {pagination.map((item, index) => {
        item != "..." ? (
          <div key={index} className={cn("item")} pageNumber={item}></div>
        ) : (
          <div key={index} className={cn("item")} pageNumber={item}></div>
        );
      })}
    </div>
  );
}

export default Paginator;
