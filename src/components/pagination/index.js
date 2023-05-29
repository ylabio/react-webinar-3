import {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination({totalNumber, currentPage, setCurrentPage, limit}) {
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);
  let count = totalNumber ? Math.ceil((totalNumber += 1) / limit) : 0;
  let pages = [];

  for (let i = 1; i <= count; i++) {
    pages.push(i);
  }

  useEffect(() => {
    let tempNumberOfPage = [...pages];

    if (tempNumberOfPage.length === 1) {
      tempNumberOfPage = [1];
    }

    else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfPage = [1, 2, 3, 4, "...", pages.length];
    } 
    
    else if (currentPage === 4) {
      const sliced = pages.slice(0, 5)
      tempNumberOfPage = [...sliced, "...", pages.length]
    }

    else if (currentPage > 4 && currentPage < pages.length - 2) {
      const sliced1 = pages.slice(currentPage - 2, currentPage)
      const sliced2 = pages.slice(currentPage, currentPage + 1)
      tempNumberOfPage = ([1, "...", ...sliced1, ...sliced2, "...", pages.length])
    }

    else if (currentPage > pages.length - 3) {
      const sliced = pages.slice(pages.length - 4) 
      tempNumberOfPage = ([1, "...", ...sliced])                     
    }

    setArrOfCurrButtons(tempNumberOfPage);
  }, [totalNumber, currentPage])

  const callbacks = {
    onSet: (e) => {
      if (e.target.textContent === "...") {
        return;
      }
      return setCurrentPage(e.target.textContent);
    },
    setColor: (elem) => {
      if (elem === "...") {
        return " Color-link";
      } else {
        return "";
      }
    },
    setHover: (elem) => {
      if (currentPage === elem) {
        return " Selected";
      } else if (elem === "...") {
        return " Disable";
      } else {
        return "";
      }
    }
  }

  const cn = bem('Pagination');

  return (
    <ul className={cn()}>
      {arrOfCurrButtons.map((elem, index) => (
        <li 
          key={index} 
          className={"Pagintion-item" + callbacks.setHover(elem)} 
          onClick={callbacks.onSet}
          >
          <a className={"Pagintion-link" + callbacks.setColor(elem)}>{elem}</a>
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  totalNumber: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  setCurrentPage: PropTypes.func
};

export default memo(Pagination);