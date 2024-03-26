import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentsLayout({children, level}) {

  const newLvl = level > 5 ? 5 : level;
  const pad = newLvl === 1 ? 40 : 30;

  return (
    <div className={'CommentsLayout'} style={{paddingLeft: `${pad}px`}}>
      {children}
    </div>
  )
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number
};

export default memo(CommentsLayout);