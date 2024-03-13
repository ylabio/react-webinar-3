import PropTypes from 'prop-types'
import { memo} from 'react'
import './style.css';

function Pagination({countPages, currentPage, onChangePage}) {
  const array = [];
  for (let i = 1; i <= countPages; i++) {
    array.push(i);
  }

  const changePage = (numberPage) => {
    onChangePage(numberPage)
  }

  let dotsRendered = false;

  return (
    <div className='Pagination'>
      <div className='Pagination__content'>
        {array.map(number => {
          if (number === 1 || number === countPages || currentPage === number || (currentPage + 1) === number || (currentPage - 1) === number || (currentPage === 1 && number === 3) || (currentPage === countPages && number === countPages - 2)) {
            dotsRendered = false;
            return (
              <button className={`Pagination__content-page${currentPage === number ? ' active' : ''}`}
                      onClick={() => currentPage !== number && changePage(number)} key={number}>{number}</button>
            )
          } else {
            if (!dotsRendered) {
              dotsRendered = true;
              return (<span key={number}>...</span>)
            } else {
              return null;
            }
          }
        })}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  countPages: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
};

Pagination.defaultProps = {
  onChangePage: () => {},
}


export default memo(Pagination);
