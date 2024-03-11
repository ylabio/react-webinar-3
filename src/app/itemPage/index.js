import {memo, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Head from '../../components/head';
import NavBar from '../../components/navbar';
import ItemInfo from '../../components/itemInfo';

function ItemPage({onOpen,amount, sum}) {
    const locate = useLocation();
    const [data,setData]= useState();
    useEffect(() => {
        const load = async () => {
            const response = await fetch(`api/v1/articles`+`${locate.pathname}`+`?fields=*,madeIn(title,code),category(title)`);
            const json = await response.json();
            setData(json.result)
        }
        load()
    },[])
    
    if (data != undefined){console.log(data.title)}
  return (
    <>
    {data != undefined 
    ? <> 
    <Head title={data.title}/> 
    <NavBar 
        onOpen={onOpen} 
        amount={amount}
        sum={sum}
    />
    <ItemInfo data={data}/>
    </>
    : <> 
    <Head title=''/> 
    <NavBar 
        onOpen={onOpen} 
        amount={amount}
        sum={sum}
    />
    </>}
    </>
  )
}


export default memo(ItemPage);