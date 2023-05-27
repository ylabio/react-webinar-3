import propTypes from "prop-types";
import './style.css'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
export const PaginationButton = ({page}) => {
    const store = useStore();
    const select = useSelector((store) => ({
        currentPage: store.catalog.currentPage
    }))

    return <button disabled={page === select.currentPage} className={'Pagination-button' + (page === select.currentPage ? ' Pagination-button_active' : '')} onClick={() => store.actions.catalog.changePage(page)}>{page}</button>
}

PaginationButton.propTypes = {
    page: propTypes.number
}