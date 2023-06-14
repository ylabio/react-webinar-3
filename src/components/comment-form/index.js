import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm({t, exists, answerId, padding, paramsId, setAnswerId, onEnter, onSubmit}) {
    const cn = bem('CommentForm');

    const [text, setText] = useState("");


    return (
        <div style={{"paddingLeft": `${padding}px`}} className={cn()}>
        {
            exists ? (
                <form onSubmit={(e) => onSubmit(e, answerId, paramsId,text)} className={cn("form")}>
                    <label className={cn("label")} htmlFor="comment">
                        {answerId === paramsId ? t("comments.newcomment") : t("comments.newanswer")}
                    </label>
        
                    <textarea value={text} onChange={(e) => setText(e.target.value)} name="comment" id="comment" className={cn("text")}/>
        
                    <div className={cn("buttons")}>
                        <button disabled={!text || !text.trim().length} type='submit' className={cn("send")}>
                            {t("comments.send")}
                        </button>

                        {
                            answerId !== paramsId && (
                                <button onClick={() => setAnswerId(paramsId)} className={cn("btn-cancel")}>
                                    {t("comments.cancel")}
                                </button>
                            )
                        }
                    </div>
                </form>
            ) : (
                <div className='log'>
                    <button className={cn("enter")} onClick={onEnter}>
                        {t("comments.enter")}
                    </button>
                    {`, ${t("comments.logdescr")}.`}
                    {
                        answerId !== paramsId && (
                            <button onClick={() => setAnswerId(paramsId)} className={cn("link-cancel")}>
                                {t("comments.cancel")}
                            </button>
                        )
                    }
                </div>
            )
        }
        </div>
    );
}

CommentForm.propTypes = {
    t: PropTypes.func,
    exists: PropTypes.bool,
    answerId: PropTypes.string,
    padding: PropTypes.number,
    paramsId: PropTypes.string,
    setAnswerId: PropTypes.func,
    onSubmit: PropTypes.func
};

CommentForm.defaultProps = {
    t: (t) => t,
    setAnswerId: () => {},
    onSubmit: () => {}
};

export default memo(CommentForm);
