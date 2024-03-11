import {memo, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';

function ListNavigation({length, setSkip}) {
    const [Count,setCount] = useState(53) // Текущая страница
    const arrPage = []
    const [CurrentPages, setCurrentPages] = useState([]);
    const totalPages = Math.round((length/10)+0.5);
    

    useEffect(() => {
        for (let i=1; i<=totalPages; i++){
            arrPage.push(i)
        }
        let tempPages = [...arrPage];
    
        if (arrPage.length > 5) {
          // if (Count >= 1 && Count <= 2) {
          //   tempPages = [1, 2, 3, '...', arrPage.length];
          // } else if (Count === 3) {
          //   const sliced = arrPage.slice(0, 4);
          //   tempPages = [...sliced, '...', arrPage.length];
          // } else if (Count > 3 && Count < arrPage.length - 2) {
          //   const sliced1 = arrPage.slice(Count - 2, Count);
          //   const sliced2 = arrPage.slice(Count, Count + 1);
          //   tempPages = ([1, '...', ...sliced1, ...sliced2, '...', arrPage.length])
          // } else if (Count > arrPage.length - 3) {
          //   const sliced = arrPage.slice(arrPage.length - 4);
          //   tempPages = ([1, '...', ...sliced]);
          // } 
          console.log(Count,'/',totalPages)
          if (Count < 4){
            let lim = Count == 3 ? 4 : 3;        
            tempPages = [...tempPages.slice(0,lim),0,tempPages.length]
          } else if (Count == totalPages-3){
            let lim = Count == totalPages-2 ? -4 : -3;  
            tempPages = [1,0,...tempPages.slice(lim)]
          } else tempPages = [1,0,...tempPages.slice(Count-2,Count+1),0,tempPages.length]
        }
    
        setCurrentPages(tempPages);
      }, [Count, totalPages])

      const onPage = (number) => {
        setCount(number)
        setSkip(number*10)
      }


  return (
    <div className={'Navbar'}>
      {CurrentPages.map((page,index) => (
        page == 0 
        ? (<a>{' ... '}</a>) 
        : (<button 
            key={index}            
            className={`Navbar-btn ${Count === page && 'Navbar-btn-active'}`}
          >
            {page}
          </button>
          )     
      )
      )}
    </div>
  )
}

// List.propTypes = {
//   list: PropTypes.arrayOf(PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//   })).isRequired,
//   renderItem: PropTypes.func,
// };

// List.defaultProps = {
//   renderItem: (item) => {},
// }

export default memo(ListNavigation);