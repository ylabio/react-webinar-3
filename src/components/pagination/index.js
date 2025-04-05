import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { getFormatPages } from '../../utils';

function Pagination({ currentPage, totalPages, limit, onChangePage = () => {}, onChangeLimit = () => {}}) {
  return (
    <div className="Pagination">
      <div className="Pagination-limit">
        <h4>Количество записей на странице:</h4>
        <div className="Pagination-radio">
          <label className="Pagination-radio-label">
            <input
            type="radio"
            value={5}
            checked={limit === 5}
            onChange={(e) => onChangeLimit(Number(e.target.value))}
            />
            5
          </label>
        <label className="Pagination-radio-label">
          <input
            type="radio"
            value={10}
            checked={limit === 10}
            onChange={(e) => onChangeLimit(Number(e.target.value))}
          />
          10
        </label>
        <label className="Pagination-radio-label">
          <input
            type="radio"
            value={20}
            checked={limit === 20}
            onChange={(e) => onChangeLimit(Number(e.target.value))}
          />
          20
        </label>
        </div>
      </div>

      <ul className="Pagination-list">
        {getFormatPages(totalPages, currentPage).map((page, index) => {
          return (
            <li key={index}>
              <Button onClick={() => onChangePage(page)} style={currentPage === page ? 'page-current' : 'page'} title={page.toString()} disabled={typeof(page) === 'string'}/>
            </li>
          )
        })}
      </ul>
    </div>
  );
}


export default memo(Pagination);
