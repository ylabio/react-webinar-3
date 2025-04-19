import { memo } from 'react';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentsTitle({ commentsCount }) {
  const { t } = useTranslate();

  return (
    <div className="Comments-title">
      {t('comments.title')}({commentsCount})
    </div>
  );
}

CommentsTitle.propTypes = {
  comment: PropTypes.shape({
    commentsCount: PropTypes.number.isRequired,
  }),
};

export default memo(CommentsTitle);
