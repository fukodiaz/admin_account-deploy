const directoriesRequested = () => ({type: 'FETCH_DIRECTORIES_REQUEST'});

const directoriesLoaded = (payload) => ({
		type: 'FETCH_DIRECTORIES_SUCCESS',
		payload
});

const directoriesError = (payload) => ({
	type: 'FETCH_DIRECTORIES_FAILURE',
	payload
});

const fetchDirectories = (methodService, dispatch) => () => {
	dispatch(directoriesRequested());
	methodService()
		.then(data => dispatch(directoriesLoaded(data)))
		.catch(error => dispatch(directoriesError(error)));
};

const showAllDirectories = () => ({type: 'SHOW_ALL_DIRECTORIES'});

const openModalDirectories = (payload) => ({
	type: 'OPEN_MODAL_DIRECTORIES',
	payload
});

const additInputChanged = (payload) => ({
	type: 'ADDIT_INPUT_CHANGED',
	payload
});

const putTitleRequested = () => ({type: 'PUT_TITLE_REQUEST'});

const putTitleSuccess = (payload) => ({
	type: 'PUT_TITLE_SUCCESS',
	payload
}); 

const putTitleError = (payload) => ({
	type: 'PUT_TITLE_FAILURE',
	payload
});

export {
	fetchDirectories,
	showAllDirectories,
	openModalDirectories,
	additInputChanged,
	putTitleRequested,
	putTitleSuccess,
	putTitleError
};