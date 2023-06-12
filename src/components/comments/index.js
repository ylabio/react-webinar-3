import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Comment from '../comment';
import { handleDate } from '../../utils/handle-date';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import { Link } from 'react-router-dom';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import './style.css';

function Comments(props) {
	const reduxSelect = useSelectorRedux(
		(state) => ({
			comments: state.comments.comments,
		}),
		shallowequal
	);

	const select = useSelector((state) => ({
		userAuth: state.session.exists,
	}));

	const renderList = useMemo(
		() =>
			treeToList(listToTree(reduxSelect.comments, props.paramsId), (item, level) => ({
				...item,
				level,
			})),
		[reduxSelect.comments]
	);

	return (
		<>
			<div className="Comments">
				<h2 className="Comments-all">Комментарии ({reduxSelect.comments.length})</h2>
				{renderList.map((comment) => (
					<Comment
						data={comment}
						key={comment._id}
						text={comment.text}
						userName={comment.author.profile.name}
						date={handleDate(comment.dateCreate)}
						userAuth={select.userAuth}
					/>
				))}
				{select.userAuth ? (
					''
				) : (
					<p className="Comments-alert">
						<Link to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать
					</p>
				)}
			</div>
		</>
	);
}

Comments.propTypes = {};

export default Comments;
