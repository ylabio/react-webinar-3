import React, {useMemo} from "react";
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import Dots from "./Dots";
import PropTypes, {number} from 'prop-types';


function Pagination({
    pageCount = 0,
    limit = 10,
    handlePaginate,
    currentPage,
    siblingCount = 1
}) {
    const cn = bem('Pagination');
    const pageNumbers = useMemo(
        () => new Array(pageCount)
            .fill(null).map((_, index) => ({ id: index + 1, isDot: false })),
        [pageCount]
    );

    const getItems = () => {
        const firstPage = pageNumbers[0];
        const lastPage = pageNumbers[pageNumbers.length - 1];
        if (currentPage - siblingCount <= siblingCount * 2) {
            const items = [
                ...pageNumbers.slice(0, currentPage + siblingCount),
                { id: 'dot-1', isDot: true },
                lastPage
            ];
            return items;
        } else if (currentPage + siblingCount >= pageNumbers.length) {
            const items = [
                firstPage,
                { id: 'dot-1', isDot: true },
                ...pageNumbers.slice(currentPage - 1 - siblingCount, pageNumbers.length),
            ];
            return items;
        } else {
            const items = [
                firstPage,
                { id: 'dot-1', isDot: true },
                ...pageNumbers.slice(currentPage - siblingCount - 1, currentPage + siblingCount),
                { id: 'dot-2', isDot: true },
                lastPage
            ];
            return items;
        }
    };

    return (
        <div className={cn()}>
                {getItems().map((item) => (
                        <>
                            {item.isDot ? (
                                <Dots key={item.id} />
                                ) : (
                                    <div className={cn("item")} key={item.id}>
                                        <div className={ item.id === currentPage ? cn("selected") : cn("link")} onClick={() => handlePaginate(item.id)}>
                                            {item.id}
                                        </div>
                                    </div>
                                )
                            }
                        </>
                ))}
        </div>
    )
}

Pagination.propTypes = {
    pageCount: number,
    limit: number,
    handlePaginate: PropTypes.func,
    currentPage: number,
    siblingCount: number
}

export default Pagination;