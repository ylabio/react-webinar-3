import "style.css";
function PageCountSwitcher ({productsPerPage, onCountPageChange, changeCurrentPage}) {

    return (
        <div>
            <label>Кол-во отображаемых товаров:
                <select onblur='this.size=0;' onchange='this.size=1; this.blur();'
                    className="Pages-select"
                    name="count" 
                    id="count-pages-select"
                    value={productsPerPage}
                    onChange={(event) => { 
                        const newCount = event.target.value;
                        onCountPageChange(newCount);
                        changeCurrentPage(1);
                    }}
                >
                    <option className="select-item" value={5}>5</option>
                    <option className="select-item" value={10}>10</option>
                    <option className="select-item" value={20}>20</option>
                </select>
            </label>
        </div>
    );
}

export default PageCountSwitcher;