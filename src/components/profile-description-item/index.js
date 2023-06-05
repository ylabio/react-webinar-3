import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileDescriptionItem({title, description}){

  const cn = bem('ProfileDescriptionItem');

  return (
    <div className={cn()}>
      {`${title}: `}
      <span>{description}</span>
    </div>
  );
}

ProfileDescriptionItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default memo(ProfileDescriptionItem);
