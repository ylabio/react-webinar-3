import {memo, useCallback} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Left from "./left";
import Right from "./right";
import Center from "./center";
import SelectPerPage from "../select-per-page";
function Pagination({onChangePerPage, translation, perPage, currentPage, pageAmount}) {
  const cn = bem('Pagination');
  const handlerChangePerPage = useCallback((newPerPage) => {onChangePerPage(newPerPage)}, []);
  return (
    <div className={cn()}>
      <SelectPerPage onChangePerPage={handlerChangePerPage} translation={translation.perPage} perPage={perPage}/>
      <div className={cn('block')}>
        {currentPage > 2 && <Left currentPage={currentPage} />}
        <Center currentPage={currentPage} pageAmount={pageAmount} />
        {pageAmount > currentPage + 1 && <Right currentPage={currentPage} pageNumber={pageAmount}/>}
      </div>
    </div>
  );
}

export default memo(Pagination);
