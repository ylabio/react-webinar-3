import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname'
import './style.css'

const Navigation = () => {
    const cn = bem('Nav');
    return (
        <div>
            <Link to='/' className={cn('link')}>Главная</Link>
        </div>
    );
};

export default Navigation;