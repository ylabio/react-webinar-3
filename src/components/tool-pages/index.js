import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ToolPages({page,count,openPageToCatalog}) {
  const cn = bem('ToolPages');

  const elementCell = (num) => <span key={num-1} className={cn('cell')} onClick={() => openPageToCatalog(num-1)}>{num}</span>
  const elementCellCurrent = (num) => <span key={num-1} className={cn('cell-current')}>{num}</span>
  const elementCellThreeВots = (num) => <span key={num-1} className={cn('cell-ThreeВots')}>...</span>
  const elementCellOne = <span className={cn('cell-one')}>1</span>

  const fToolPages = () => {
    let MassElements = [];
    let listItems;
    let countPage = Math.floor(count / 10) + (count % 10 > 0 ? 1 : 0);
    if (page == countPage && countPage == 1) {return elementCellOne}
    if (page >= 1 && countPage > 1) {
        for (let vvi = 1; vvi <= countPage; vvi++) {
            if (page == vvi) {
                if (vvi == countPage && vvi-2 >= 1) {
                    MassElements.push(elementCell(vvi-2));
                }
                if (vvi-1 >= 1) {
                    MassElements.push(elementCell(vvi-1));
                }
                MassElements.push(elementCellCurrent(vvi));
                if (vvi+1 <= countPage) {
                    MassElements.push(elementCell(vvi+1));
                }
                if (vvi == 1 && vvi+2 <= countPage) {
                    MassElements.push(elementCell(vvi+2));
                }
            }
            else {
                if (vvi == 1 && page >= 3)
                {
                    MassElements.push(elementCell(vvi));
                    if (page > 3) MassElements.push(elementCellThreeВots(vvi+1));
                }
                if (vvi == countPage && page <= countPage-2)
                {
                    if (page < countPage-2) MassElements.push(elementCellThreeВots(vvi-1));
                    MassElements.push(elementCell(vvi));
                }
            }
        }
        listItems = MassElements.map((element) => {
            return element;
        })
        return listItems;
    }
    return '';
  }

  return (
    <>
    <div>
        {'\n'}
    </div>
    <div className={cn()}>
        {fToolPages()}
    </div>
    </>
  );
}

ToolPages.propTypes = {
    page: PropTypes.number,
    count: PropTypes.number,
    openPageToCatalog: PropTypes.func,
};

ToolPages.defaultProps = {
    page: 0,
    count: 0,
    openPageToCatalog: () => {},
}

export default memo(ToolPages);
