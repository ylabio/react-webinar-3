export const FETCH_COMMENTS_REQUEST = 'comments/FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'comments/FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'comments/FETCH_COMMENTS_FAILURE';
export const POST_COMMENT_REQUEST = 'comments/POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'comments/POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'comments/POST_COMMENT_FAILURE';

const API_BASE = '/api/v1';

export const fetchComments = (articleId) => async dispatch => {
  if (!articleId) {
    dispatch({ type: FETCH_COMMENTS_FAILURE, error: 'articleId отсутствует' });
    return;
  }

  dispatch({ type: FETCH_COMMENTS_REQUEST });

  try {
    const token = localStorage.getItem('token') || '';
    const url = new URL(`${API_BASE}/comments`, window.location.href);
    url.searchParams.set('limit', '*');
    url.searchParams.set('search[parent]', articleId);
    url.searchParams.set('fields',
      'items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count'
    );

    const res = await fetch(url.toString(), {
      headers: { 'X-Token': token },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    console.log('API /comments returned:', json);

    const raw = json.result?.items || json.data?.items || json.items || [];

    const items = raw.map(c => ({
      id: c._id,
      parent: typeof c.parent === 'object' ? c.parent._id : c.parent,
      author: c.author.profile.name,
      date: c.dateCreate,
      text: c.text,
    }));

    dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: items });
  } catch (err) {
    dispatch({ type: FETCH_COMMENTS_FAILURE, error: err.message });
  }
};


// Отправка нового комментария
export const postComment = ({ parentId, parentType, text }) => async (dispatch) => {
  dispatch({ type: POST_COMMENT_REQUEST });

  try {
    const token = localStorage.getItem('token') || '';
    const response = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'X-Token': token }),
      },
      body: JSON.stringify({
        text,
        parent: { _id: parentId, _type: parentType },
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const newComment = {
      id: data._id,
      parent: data.parent?._id || data.parent,
      author: data.author.profile.name,
      date: data.dateCreate,
      text: data.text,
    };

    dispatch({ type: POST_COMMENT_SUCCESS, payload: newComment });
  } catch (error) {
    dispatch({ type: POST_COMMENT_FAILURE, error: error.message });
  }
};
