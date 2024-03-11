import { memo, useEffect, useState } from "react";
import './style.css';

function ListNavigation({length, setSkip}) {
    const [Count,setCount] = useState(1) // Текущая страница
    const arrPage = []
    const [CurrentPages, setCurrentPages] = useState([]);
    const totalPages = Math.round((length/10)+0.5);
    

    useEffect(() => {
        for (let i=1; i<=totalPages; i++){
            arrPage.push(i)
        }
        let tempPages = [...arrPage];
    
        if (arrPage.length > 5) {
          console.log(Count,'/',totalPages)
          if (Count < 4){
            let lim = Count == 3 ? 4 : 3;
            tempPages = [...tempPages.slice(0,lim),0,tempPages.length]
          } else if (Count > totalPages-3){
            let lim = Count == totalPages-2 ? -4 : -3;
            tempPages = [1,0,...tempPages.slice(lim)]
          } else tempPages = [1,0,...tempPages.slice(Count-2,Count+1),0,tempPages.length]
        }
    
        setCurrentPages(tempPages);
      }, [Count, totalPages])

      const onPage = (number) => {
        setCount(number)
        setSkip((number-1)*10)
      }


  return (
    <div className={'Navbar'}>
      {CurrentPages.map((page,index) => (
        page == 0
        ? (<a>{' ... '}</a>)
        : (<button
            key={index}
            className={`Navbar-btn ${Count === page && 'Navbar-btn-active'}`}
            onClick={() => onPage(page)}>
            {page}
          </button>
          )
      )
      )}
    </div>
  )
}

export default memo(ListNavigation);