import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PaginationButton from "../pagination-button";

const PaginationView = ({
                          composition,
                          currentPage,
                          startGroup,
                          centerGroup,
                          endGroup,
                          separatorStart,
                          separatorEnd,
                          onPageSelect,
                        }) => {

  const cn = bem('PaginationView');

  const renderGroup = (group, name) => {
    return (
      <div className={cn('pageGroup', {type: name})}>
        {group?.map((page) => (
          <PaginationButton
            key={page}
            onClick={(page) => {
              onPageSelect(page)
            }}
            isCurrentPage={page === currentPage}
            page={page}
          />
        ))}
      </div>
    );
  };

  const renderSeparator = (name) => {
    return (
      <div className={cn('pageGroup', {type: name})}>...</div>
    );
  };

  return (
    <div className={`PaginationView PaginationView_composition_${composition}`}>
      {renderGroup(startGroup, 'startGroup')}
      {separatorStart && renderSeparator('separatorStart')}
      {centerGroup && renderGroup(centerGroup, 'centerGroup')}
      {separatorEnd && renderSeparator('separatorEnd')}
      {endGroup && renderGroup(endGroup, 'endGroup')}
    </div>
  );
};

/*PaginationView.propTypes = {
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
};*/

export default memo(PaginationView);
