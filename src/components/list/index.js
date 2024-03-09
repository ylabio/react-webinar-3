import { memo, useState } from "react";
import PropTypes from 'prop-types';
import Pagination from "../pagination";
import './style.css';
import useStore from "../../store/use-store";

function List({ list, count, renderItem }) {
  const [currentPage, setCurrentPage] = useState(1);

  const store = useStore();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    store.actions.catalog.load(page);
  };

  return (
    <>
      <div className='List'>{
        list.map(item =>
          <div key={item._id} className='List-item'>
            {renderItem(item)}
          </div>
        )}
      </div>
      <Pagination
        count={count}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => { },
}

export default memo(List);
