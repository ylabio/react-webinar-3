export default {
    /**
     * id товара
     * @param id 
     * @return {Function}
     */
    load: id => {
        return async (dispatch, getState, services) => {
            // Сброс загрузки и установка признака ожидания загрузки
            dispatch({ type: 'comments/load-start' });

            try {
                const res = await services.api.request({
                    url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
                });
                // Комментарии загружены
                dispatch({ type: 'comments/load-success', payload: { comments: res.data.result } });
            } catch (e) {
                //Ошибка загрузки
                dispatch({ type: 'comments/load-error' });
            }
        };
    },

    sendArticleComment: (articleId, data, token) => {
        return async (dispatch, getState, services) => {
            // Сброс загрузки и установка признака ожидания загрузки
            dispatch({ type: 'sendArticleComment/load-start' });

            const sendingData = JSON.stringify({
                text: data,
                parent: { "_id": articleId, "_type": "article" }
            })

            try {
                const res = await services.api.request({
                    url: `/api/v1/comments`,
                    method: 'POST',
                    headers: { 'X-Token': token },
                    body: sendingData,
                });
                // Комментарий отправлен
                console.log(res);

                dispatch({ type: 'sendArticleComment/load-success', payload: { status: true, message: 'Комментарий успешно отправлен!' } });

            } catch (e) {
                //Ошибка загрузки
                dispatch({ type: 'sendArticleComment/load-error', payload: { status: false, message: 'Ошибка отправки комментария!' } });
                console.log(e)
            }
        }
    },

    sendReplyComment: (replyId, data, token) => {
        return async (dispatch, getState, services) => {
            // Сброс загрузки и установка признака ожидания загрузки
            dispatch({ type: 'sendReplyComment/load-start' });

            const sendingData = JSON.stringify({
                text: data,
                parent: { "_id": replyId, "_type": "comment" }
            })

            try {
                const res = await services.api.request({
                    url: `/api/v1/comments`,
                    method: 'POST',
                    headers: { 'X-Token': token },
                    body: sendingData,
                });
                // Комментарий отправлен
                console.log(res);

                dispatch({ type: 'sendReplyComment/load-success', payload: { status: true, message: 'Комментарий успешно отправлен!' } });

            } catch (e) {
                //Ошибка загрузки
                dispatch({ type: 'sendReplyComment/load-error', payload: { status: false, message: 'Ошибка отправки комментария!' } });
                console.log(e)
            }
        }
    },
};