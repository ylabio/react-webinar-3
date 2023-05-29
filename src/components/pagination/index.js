import  { memo, useState } from 'react';
import Button from '../button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => { 
  
  const [visiblePages, setVisiblePages] = useState([1,2,3]);

  // Обновление страниц
  const updateVisiblePages = (page) => {
    let pages = [];
    if (page <= 2) {
      // Отображаем первые три страницы
      pages = [1, 2, 3];
    } else if (page >= totalPages - 1) {
      // Отображаем последние три страницы
      pages = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      // Отображаем текущую страницу и две соседних
      pages = [page - 1, page, page + 1];
    }
    setVisiblePages(pages);
  };

  // Обработчик нажатия на кнопку страницу
  const handlePageClick = (page) => {
    onPageChange(page);
    updateVisiblePages(page);
  };
  
  // Генерация кнопок пагинации
  const renderPageButtons = () => {
    const buttons = visiblePages.map((page) => (
      <Button
        key={page}
        onClickButton={handlePageClick}
        page={page}
        selectedPage={currentPage}
        ellipsis=''
      />
    ));

    if (currentPage > 2) {
      buttons.unshift(
        <Button 
          key={1} 
          onClickButton={handlePageClick} 
          page={1} 
          // ellipsis={buttons[1] !== 2 ? 'start' : ''}/>
          ellipsis={currentPage !== 3 ? 'start' : ''}/>
      );
    }

    if (currentPage < totalPages - 1) {
      buttons.push(
        <Button key={totalPages} onClickButton={handlePageClick} page={totalPages} ellipsis='end'/>
      );
    }
    return buttons;
  };

  return (
     <div className="pagination">
      {renderPageButtons()}
     </div>
    );
};

export default Pagination;