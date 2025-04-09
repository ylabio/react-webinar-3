import "style.css";
import text from '../../text';
import useSelector from '../../store/use-selector';

function PageCountSwitcher ({productsPerPage, onCountPageChange, changeCurrentPage}) {
    const select = useSelector(state => ({
        lang: state.language.language || 'ru',
      }))

    return (
        <div>
            <label>{text[select.lang].productsQuantity}
                <select
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