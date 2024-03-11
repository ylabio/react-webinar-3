import React from "react";
import { cn as bem } from "@bem-react/classname";

function paginatorItem({ pageNumber, isSelected = false }) {
  const cn = bem("PaginatorItem");

  return (
    <div key={index} className={cn({ selected: true })}>
      {pageNumber}
    </div>
  );
}
