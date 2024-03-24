import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import commentItem from '../comment-item';
import { useState } from 'react';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import IsLogin from '../../utils/comment-or-login';
const CommentAmount = ({ amount,title }) => {
    return  (
        
        <div className='amount'  >
            {title}: ({amount})
        </div>
    );
};

export default memo(CommentAmount);
