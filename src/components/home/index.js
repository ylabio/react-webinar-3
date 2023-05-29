import React from 'react';
import {Link} from "react-router-dom";
import './ctyle.css'



const Home = ({goToFirstPage}) => {
    return (
        <div>
            <Link className={'Home'} to={`/page/1`} onClick={goToFirstPage}>Главная</Link>
        </div>
    );
};

export default Home;