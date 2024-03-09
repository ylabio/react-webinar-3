import {memo,useState,useEffect} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import Pagination from "../pagination";

function List({list, renderItem}) {

  // const [currentPage, setCurrentPage] = useState(1);
  // const [products, setProducts] = useState([]);
  // const itemsPerPage = 10; // Количество товаров на странице

  // useEffect(() => {
  //     load();
  // }, [currentPage]);

  // const totalPages = Math.ceil(products.length / itemsPerPage);

  // const load = async () => {
  //     const response = await fetch('/api/v1/articles?limit=100');
  //     const json = await response.json();
      
  //     setProducts(json.result.items);
  // };

  // const handlePageChange = (page) => {
  //     setCurrentPage(page);
  // };

  // const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item)}
        </div>
      )}
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
}

export default memo(List);
