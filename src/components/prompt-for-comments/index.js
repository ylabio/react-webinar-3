import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';

function PromptForComments({ back, subLink, subDesc }) {
  const cn = bem('PromptForComments');

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/login" state={{ back: back }}>
        {subLink}
      </Link>
      {subDesc}
    </div>
  );
}

// PromptForComments.propTypes = {
//   back: PropTypes.string,
//   subLink: PropTypes.string,
//   subDesc: PropTypes.string,
// };

export default memo(PromptForComments);
