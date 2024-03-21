import React,{memo} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/spinner';

const PrivateRoute = (props) => {

    
    
    if (props.state){
        return (
            <Navigate to={props.link}/>
        )
    }

    return (
        <Spinner active={props.waiting}>{props.children}</Spinner>  
    );
};

export default memo(PrivateRoute);