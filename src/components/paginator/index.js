import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { paginationBuilder } from "../../utils";
import "./style.css";

function Paginator({ currentPage, itemsTotal, changePage }) {
  const cn = bem("Paginator");
  const pagination = paginationBuilder(currentPage, itemsTotal, 10);

  return (
    <div className={cn()}>
      <div className={cn("controls")}>
        {pagination.map((item, index) => {
          return item !== "..." ? (
            <div
              key={index}
              className={
                item === currentPage
                  ? cn("item", { selected: true })
                  : cn("item")
              }
              onClick={() => {
                changePage(item);
              }}
            >
              {item}
            </div>
          ) : (
            <div key={index} className={cn("item", { dots: true })}>
              ...
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Paginator);
