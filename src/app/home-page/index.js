import React from 'react';
import Main from '../main/index'
import Basket from '../basket/index';
import useSelector from '../../store/use-selector';
 function HomePage (){
  const activeModal = useSelector(state => state.modals.name);
    return (
        <>
            <Main>{activeModal === 'basket' && <Basket/>}</Main>
        </>
    )

}
export default HomePage;