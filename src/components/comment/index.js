import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment(
    {
        t,
        _id,
        name,
        authorId,
        day,
        month, 
        year, 
        hours, 
        minutes, 
        text, 
        padding, 
        userId,
        setAnswerId
    }) {
    const cn = bem('Comment');


    return (
        <div style={{"paddingLeft": `${padding}px`}} className={cn()}>
            <div className={cn('head')}>
                <h3 className={cn(authorId === userId ? "myName" : "name")}>{name}</h3>
                <div className={cn('date')}>{day} {t(month)} {year} {t("comments.at")} {hours}:{minutes}</div>
            </div>

            <div className={cn("text")}>
            {text}
            </div>

            <button onClick={() => setAnswerId(_id)} className={cn("respond")}>
                {t("comments.respond")}
            </button>
        </div>
    );
}

Comment.propTypes = {
    t: PropTypes.func,
    _id: PropTypes.string,
    name: PropTypes.string,
    authorId: PropTypes.string,
    day: PropTypes.number,
    month: PropTypes.string,
    year: PropTypes.number,
    hours: PropTypes.string,
    minutes: PropTypes.string,
    text: PropTypes.string,
    padding: PropTypes.number,
    setAnswerId: PropTypes.func,
};

Comment.defaultProps = {
    t: (t) => t,
    setAnswerId: () => {}
};

export default memo(Comment);
