import React from 'react';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import { Link } from 'react-router-dom';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import { useState, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';


export default function CommentList({ comments = [], productId = null, user = {}, isAuthorized = false }) {
    const [replyingId, setReplyingId] = useState(null);

    const tree = useMemo(
        () => [
            ...treeToList(listToTree(comments), (comment, level) => ({
                comment: comment,
                level: level,
            }))],
        [comments],);

    const count = tree.length - 1;

    const handleReplyClick = (id) => {
        setReplyingId((prev) => (prev === id ? null : id));
    };

    const cn = bem('CommentList');
    return (
        <div className={cn()}>
            <h2 className={cn('title')}>Комментарии ({count > 0 ? count : 0})</h2>
            <div className={cn('wrapper')}>
                {tree.slice(1).map(item => (
                    <div key={item.comment._id} style={{ marginLeft: `${(item.level - 1) * 40}px` }}>
                        <CommentItem
                            comment={item.comment}
                            onReplyClick={handleReplyClick}
                            replyingId={replyingId}
                            user={user}
                            isAuthorized={isAuthorized}
                        />
                    </div>
                ))}
            </div>
            {isAuthorized ? (
                replyingId === null && <CommentForm productId={productId} />
            ) : (
                replyingId === null && <p className={cn('enter')}><Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать</p>
            )}
        </div>
    );
}
