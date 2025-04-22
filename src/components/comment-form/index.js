import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({ parentId = null, parentName = null, onCancel = () => { } }) {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const productId = useSelector(state => state.article.data?._id);

    const handleSubmit = e => {
        e.preventDefault();
        if (!text.trim()) return;

        dispatch(commentsActions.add({
            text,
            parent: {
                _id: parentId || productId,
                _type: parentId ? 'comment' : 'article',
            },
        }));

        setText('');
        if (onCancel) onCancel(); // закрыть форму ответа
    };

    const cn = bem('CommentForm');
    return (
        <form className={cn()} onSubmit={handleSubmit}>
            <div className={cn('title')}>Новый {parentId ? 'ответ' : 'комментарий'}</div>
            <textarea
                className={cn('textarea')}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={parentId && `Мой ответ для ${parentName}`}
            />
            <div className={cn('actions')}>
                <Button title="Отправить" style="primary" type="submit" />
                {parentId && (
                    <Button onClick={onCancel} title="Отмена" style="outline" type="button" />
                )}
            </div>
        </form>
    );
}

CommentForm.propTypes = {
    parentId: PropTypes.string,
    parentName: PropTypes.string,
    onCancel: PropTypes.func,
};

export default CommentForm;
