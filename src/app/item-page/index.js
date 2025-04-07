import React, {memo, useCallback} from "react"
import useSelector from '../../store/use-selector';
import Basket from '../basket/index';
import ItemDetailPage from '../item-detail/index'

export default function ItemPage(){
    const activeModal = useSelector(state => state.modals.name);
    return(

      <ItemDetailPage>{activeModal === 'basket' && <Basket/>}</ItemDetailPage>
    );
};

export async function loader({params}){
  const id = params.itemId
  const response = await fetch(`/api/v1/articles/`+ id);
  if(!response.ok){
      throw new Response(JSON.stringify({message: 'Could not fetch item detail', }))
  }else{
      const json = await response.json();
      return json;
  }
}
