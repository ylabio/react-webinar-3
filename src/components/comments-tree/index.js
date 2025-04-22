import React from 'react';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import { Link, useLocation } from 'react-router-dom';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import { useState, useMemo, useEffect, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const MAX_LEVEL = 10;// максимальный отображаемый уровень вложенности комментариев, чтобы не было слишком много отступов


export default function CommentList({ comments = [], productId = null, user = {}, isAuthorized = false }) {
    const [replyingId, setReplyingId] = useState(null);

    const tree = useMemo(() => {
        const updatedComments = [...comments];

        // Добавляем фиктивный комментарий для формы ответа
        if (replyingId) {
            const replyingComment = updatedComments.find((comment) => comment._id === replyingId);
            if (replyingComment) {
                updatedComments.push({
                    _id: 'reply-form',
                    isReplyingForm: true,
                    parent: {
                        _id: replyingComment._id,
                        _type: 'comment',
                    },
                    parentName: replyingComment.author?.profile?.name || user?.profile?.name,
                });
            }
        }

        return [
            ...treeToList(listToTree(updatedComments), (comment, level) => ({
                comment: comment,
                level: level,
            })),
        ];
    }, [comments, replyingId]);

    const count = tree.length;

    const handleReplyClick = (id) => {
        setReplyingId((prev) => (prev === id ? null : id));
    };

    const replyFormRef = useRef(null);

    // Скролл к форме ответа
    useEffect(() => {
        if (replyingId && replyFormRef.current) {
            replyFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [replyingId]);

    const location = useLocation();

    const cn = bem('CommentList');
    return (
        <div className={cn()}>
            <h2 className={cn('title')}>Комментарии ({count > 0 ? count : 0})</h2>
            <div className={cn('wrapper')}>
                {tree.map((item) => {
                    const { comment, level } = item;
                    const isReplyingForm = comment.isReplyingForm;
                    const marginStyle = level <= MAX_LEVEL
                        ? { marginLeft: `${(level) * 40}px` }
                        : { marginLeft: `${(MAX_LEVEL) * 40}px` };

                    // Если это форма ответа, то рендерим ее. К ней добавлен ref, чтобы скроллить к ней
                    if (isReplyingForm) return (
                        <div style={marginStyle} ref={replyFormRef}>
                            {isAuthorized ? (
                                <CommentForm
                                    parentId={comment.parent._id}
                                    parentName={comment.parentName}
                                    onCancel={() => setReplyingId(null)}
                                />
                            ) : (
                                <p className={cn('enter')}>
                                    <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
                                </p>
                            )}
                        </div>
                    );

                    return (
                        <div key={comment._id}>
                            <div style={marginStyle}>
                                <CommentItem
                                    comment={comment}
                                    onReplyClick={handleReplyClick}
                                    replyingId={replyingId}
                                    user={user}
                                    isAuthorized={isAuthorized}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {replyingId === null && (
                isAuthorized ? (
                    <CommentForm productId={productId} />
                ) : (
                    <p className={cn('enter')}>
                        <Link to="/login" state={{ back: location.pathname }}>Войдите</Link>, чтобы иметь возможность комментировать
                    </p>
                )
            )}
        </div>
    );
}
