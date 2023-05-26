import { memo, useMemo } from "react"
import PropTypes from "prop-types"
import { createPages } from "../../utils"
import { cn as bem } from "@bem-react/classname"
import "./style.css"

function Pagination({ totalPages, currentPage, changePage }) {
	const cn = bem("Pagination")

	const callbacks = {
		changePage: page => (page !== currentPage ? changePage(page) : null),
	}

	const obsPage = useMemo(() => {
		const pages = []
		createPages(pages, totalPages, currentPage)
		return pages
	}, [totalPages, currentPage])

	return (
		<div className={cn("Container")}>
			{currentPage > 2 && totalPages > 4 ? (
				<>
					<button
						className={cn("Item")}
						onClick={() => callbacks.changePage(1)}
					>
						1
					</button>
					<div className={cn("Spread")}>...</div>
				</>
			) : null}

			{obsPage.map(item => (
				<button
					key={item}
					className={item === currentPage ? cn("CurrentItem") : cn("Item")}
					onClick={() => callbacks.changePage(item)}
				>
					{item}
				</button>
			))}

			{currentPage + 1 < totalPages && totalPages > 4 ? (
				<>
					<div className={cn("Spread")}>...</div>
					<button
						className={cn("Item")}
						onClick={() => callbacks.changePage(totalPages)}
					>
						{totalPages}
					</button>
				</>
			) : null}
		</div>
	)
}

Pagination.propTypes = {
	totalPage: PropTypes.number,
	currentPage: PropTypes.number,
	changePage: PropTypes.func,
}

Pagination.defaultProps = {
	changePage: () => {},
}

export default memo(Pagination)
