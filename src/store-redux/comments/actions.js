export default {
	getComments: (id) => {
		return async (dispatch, getState, services) => {
			try {
				const res = await services.api.request({
					url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`,
				});
				dispatch({ type: 'comments/get-all', payload: { comments: res.data.result } });
			} catch (error) {}
		};
	},
};
