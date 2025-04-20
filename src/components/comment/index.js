import CommentsForm from '../comments-form';
import './style.css';

export const Comment = ({
  by,
  text,
  isMine,
  date,
  isFormOpen,
  toggleForm,
  onSubmit,
  value,
  onChange,
}) => {
  return (
    <div className="Comment">
      <div className="Comment-subtitle-block">
        <span className="Comment-userName" data-mine-comment={isMine ? 'isMine' : ''}>
          {by}
        </span>
        <span className="Comment-date">{date}</span>
      </div>
      <div className="Comment-text" dangerouslySetInnerHTML={{ __html: text }} />
      <button className="Comment-answer" onClick={toggleForm}>
        <span>ответить</span>
      </button>
      {isFormOpen && <CommentsForm onSubmit={onSubmit} value={value} onChange={onChange} />}
    </div>
  );
};
