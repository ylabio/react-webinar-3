import {memo, useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
// import Loader from "../loader/index";
import PropTypes from 'prop-types';
import './style.css';

function Pagination({pagesCount, onChangePage}) {
  const cn = bem('Pagination');

  // const [data, setData] = useState([]);
  // const [isLoading, setisLoading] = useState(false);

  // useEffect(() => {
  //   setisLoading(true);
  //   fetchData().then((data) => {
  //     setData(data);
  //     setisLoading(false);
  //   });
  // }, []);

  // async function fetchData() {
  //   const response = await fetch(`/api/v1/articles/`);
  //   const result = await response.json();
  //   console.log('api-result-items', result.result.items);
  //   return result.result.items;
  // }

  return (
    <div className={cn()}>

      <div className={cn('buttons')}>
        {Array(pagesCount).fill(0).map((_, i) => (
          <button key={i + 1} onClick={() => onChangePage(i+1)}>
            <Link
            // key={i + 1}
            to={`/?page=${i + 1}&count=${10}`}
            className={cn('button')}
          >
            <div key={i + 1} id={`${i + 1}`}>
              {i + 1}
            </div>
          </Link>
          </button>
        ))}
      </div>
    </div>
  )
}

// Pagination.propTypes = {
//   onAdd: PropTypes.func
// };

// Pagination.defaultProps = {
//   onAdd: () => {}
// }

export default memo(Pagination);