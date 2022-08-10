const openModalCreationNews = () => ({type: 'OPEN_MODAL_CREATION_NEWS'});

const openModalEditNews = (payload) => ({
	type: 'OPEN_MODAL_EDIT_NEWS',
	payload
});

const newsListRequested = () => ({type: 'FETCH_NEWS_LIST_REQUEST'});

const newsListLoaded = (payload) => ({
		type: 'FETCH_NEWS_LIST_SUCCESS',
		payload
});

const newsListError = (payload) => ({
	type: 'FETCH_NEWS_LIST_FAILURE',
	payload
});

const fetchNewsList = (methodService, dispatch) => () => {
	dispatch(newsListRequested());
	methodService()
		.then(data => dispatch(newsListLoaded(data)))
		.catch(error => dispatch(newsListError(error)));
};

const showAllNews = () => ({type: 'SHOW_ALL_NEWS'});

const newsImageRequested = () => ({type: 'POST_NEWS_IMAGE_REQUEST'});

const newsImagePosted = (payload) => ({
	type: 'POST_NEWS_IMAGE_SUCCESS',
	payload
}); 

const newsImageError = (payload) => ({
	type: 'POST_NEWS_IMAGE_FAILURE',
	payload
}); 

const newsDataRequested = () => ({type: 'POST_NEWS_DATA_REQUEST'});

const newsDataPosted = (payload) => ({
	type: 'POST_NEWS_DATA_SUCCESS',
	payload
}); 

const newsDataError = (payload) => ({
	type: 'POST_NEWS_DATA_FAILURE',
	payload
});

const putNewsRequested = () => ({type: 'PUT_NEWS_REQUEST'});

const putNewsSuccess = (payload) => ({
	type: 'PUT_NEWS_SUCCESS',
	payload
}); 

const putNewsError = (payload) => ({
	type: 'PUT_NEWS_FAILURE',
	payload
}); 

const newsDeleteRequested = () => ({type: 'DELETE_NEWS_REQUEST'});

const newsDeleted = (payload) => ({
	type: 'DELETE_NEWS_SUCCESS',
	payload
});

const newsDeleteError = (payload) => ({
	type: 'DELETE_NEWS_FAILURE',
	payload
});

const addIdNewsDeleted = (payload) => ({
	type: 'ADD_ID_NEWS_DELETED',
	payload
});

export {
	openModalCreationNews,
	openModalEditNews,
	newsListRequested,
	newsListLoaded,
	newsListError,
	fetchNewsList,
	showAllNews,
	newsImageRequested,
	newsImagePosted,
	newsImageError,
	newsDataRequested,
	newsDataPosted,
	newsDataError,
	putNewsRequested,
	putNewsSuccess,
	putNewsError,
	newsDeleteRequested,
	newsDeleted,
	newsDeleteError,
	addIdNewsDeleted
};