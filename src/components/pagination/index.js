import "./style.css";
import useStore from '../../store/use-store';
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
// //Когда currentPage < 4
// function paginatorLow(currentPage, totalPages) {
//     const pages = [];
//     for (let i = 1; i <= Math.min(totalPages, 3); i++) pages.push(i);
//     if (currentPage === 3) pages.push(4)
//     if (totalPages > 4) pages.push('...');
//     if (totalPages > 3) pages.push(totalPages);

//     return pages;
// }

// //Когда currentPage 4..totalPages-3
// function paginatorAverage(currentPage, totalPages) {
//     const pages = [1, '...'];

//     for (let i = currentPage-1; i <= Math.min(totalPages, currentPage + 1 ); i++) pages.push(i);

//     if (totalPages - currentPage > 4) pages.push('...');
//     if (totalPages - currentPage > 3) pages.push(totalPages);

//     return pages;
// }

function Pagination({ onPageChange }) {
    const { currentPage, totalPages } = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        totalPages: state.catalog.totalPages,
    }));

    // const getPagesNumbers = () => {
    //     const pages = [];
    //     pages.push(1);

    //     if (currentPage > 3) pages.push('...')

    //     const previous = Math.max(2, currentPage - 1);
    //     const next = Math.min(totalPages - 1, currentPage + 1);

    //     if (start > 2) {
    //         pages.push('...');
    //     }

    //     for (let i = start; i <= end; i++) {
    //         pages.push(i);
    //     }

    //     if (end < totalPages - 1) {
    //         pages.push('...');
    //     }

    //     if (totalPages > 1) {
    //         pages.push(totalPages);
    //     }

    //     return pages;
    // }


    const pageNumbers = getPaginatorButtons(currentPage, totalPages);

    // if (currentPage < 4) pageNumbers = paginatorLow(totalPages);
    // else pageNumbers = paginatorAverage(currentPage, totalPages);

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