import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Head from '../../components/head';
import ItemInfo from '../../components/itemInfo';
import NavBar from '../../components/navbar';

function ItemPage({onOpen,amount, sum, onAdd}) {
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
    <ItemInfo data={data} onAdd={onAdd} />
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

ItemPage.propTypes = {
    onAdd: propTypes.func,
  }
  
  ItemPage.defaultProps = {
    onAdd: () => {},
  }

export default memo(ItemPage);