import React,{memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import CommentArea from '../comment-area';

const CommentsList = ({list,render}) => {
    
    const cn = bem('ArticleCard');

    return (
        <div className={cn('comments-list')}>
            {
            list.map(item =>
                <div key={item._id} className={cn('comments-item-wrap')}>
                    {render(item)}
                </div>
            )
            }
            
        </div>
    );
};

export default memo(CommentsList);