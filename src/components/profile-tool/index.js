import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {NavLink} from "react-router-dom";

function ProfileTool({username}) {
	const cn = bem('ProfileTool'); 
	return (
		<div className={cn()}>
			{
				username && <NavLink to='/profile'>{username}</NavLink>
			}
		</div>

	);
}

ProfileTool.propTypes = {
	openProfile: PropTypes.func.isRequired
};

ProfileTool.defaultProps = {
	openProfile: () => {
	}
}

export default memo(ProfileTool);
