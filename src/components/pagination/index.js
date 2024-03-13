import React, { useState } from "react";
import './style.css'
import { number } from "prop-types";

const Pagination=({getPageLoad,onGetCountItems,limit})=>{
    const [active,setActive]=useState(0)
const kol_page=Math.ceil(onGetCountItems()/limit);

const pages=()=>{
    let numbersPage=[]
  
    for(let i=0;i<kol_page;i++){
numbersPage.push(i)
    }
    let numbersPageNew;
    if(kol_page>5){

 if((active===0 || active===1) && numbersPage[active+1]!=undefined && numbersPage[active+2]!=undefined ){
        numbersPageNew=[0,1,2,'...',kol_page-1]
       
    } else if(( active===2) && numbersPage[active+1]!=undefined ){
        numbersPageNew=[0,1,2,3,'...',kol_page-1]
    }
    else if(numbersPage[active-1]!=undefined &&numbersPage[active+1]!=undefined){
      
        numbersPageNew=[0,'...',numbersPage[active-1],numbersPage[active],numbersPage[active+1],'...',kol_page-1]
    }   

    if(active===kol_page-1){
        numbersPageNew=[0,'...',numbersPage[active]-2,numbersPage[active]-1,kol_page-1]

    } else if (active===kol_page-2){
        numbersPageNew=[0,'...',numbersPage[active]-1,numbersPage[active],kol_page-1]
    }
    else if (active===kol_page-3){
        numbersPageNew=[0,'...',numbersPage[active]-2,numbersPage[active]-1,numbersPage[active],kol_page-1]
    }
    } else{
        numbersPageNew=numbersPage;
    }
  
    return numbersPageNew;
}

const onClick=(elem)=>{
    if(elem!='...'){
        let skip=elem*limit
        setActive(elem)
    getPageLoad(skip,limit) 
    }

   
 
}


    return(<div className="Pagination">
    {pages().map((elem,i)=><div key={elem+i} onClick={()=>onClick(elem)} className={("Pagination-number")+(elem===active?" Pagination-number-active":'')+(elem==='...'?' Pagination-number-dots':'')}>{ elem!='...'?(elem+1):elem}</div>)}
    </div>)
}

export default Pagination;