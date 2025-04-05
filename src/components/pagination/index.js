import "./style.css";
import useSelector from '../../store/use-selector';

function getPaginatorButtons(currentPage, totalPages) {
    const paginatorButtons = [1]
    const middleButtons = [currentPage - 1, currentPage, currentPage + 1]

    for (let i = Math.min(2, totalPages); i <= totalPages - 1; i++) {
        if (i === currentPage - 2 || i === currentPage + 2) paginatorButtons.push('...');
        if (middleButtons.includes(i)) paginatorButtons.push(i);
    }

    if (totalPages > 1) paginatorButtons.push(totalPages);

    return paginatorButtons;
}

function Pagination({ onPageChange }) {
    const { currentPage, totalPages } = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        totalPages: state.catalog.totalPages,
    }));

    const pageNumbers = getPaginatorButtons(currentPage, totalPages);

    const onClick = (item) => {
        if (typeof item === 'number' && onPageChange) {
            onPageChange(item);
        }
    }

    return (
        <div className="pagination-btns">
            {
                pageNumbers.map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <span className="ellipsis">{item}</span>
                        );
                    }
                    return (
                        <button 
                            key={index}
                            className={`pagination-button ${item === currentPage ? 'active' : ''}`}
                            onClick={() => onClick(item)}
                        >
                            {item}
                        </button>
                    );
                })
            }
        </div>
    );
}

export default Pagination;