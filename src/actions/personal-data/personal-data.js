const editingPersonalData = () => ({type: 'EDITING_PERSONAL_DATA'});

const dataPersonalRequested = () => ({type: 'POST_DATA_PERSONAL_REQUEST'});

const dataPersonalPosted = (payload) => ({
	type: 'POST_DATA_PERSONAL_SUCCESS',
	payload
}); 

const dataPersonalError = (payload) => ({
	type: 'POST_DATA_PERSONAL_FAILURE',
	payload
}); 

const photoPersonalRequested = () => ({type: 'POST_PHOTO_PERSONAL_REQUEST'});

const photoPersonalPosted = (payload) => ({
	type: 'POST_PHOTO_PERSONAL_SUCCESS',
	payload
}); 

const photoPersonalError = (payload) => ({
	type: 'POST_PHOTO_PERSONAL_FAILURE',
	payload
}); 


export {
	editingPersonalData,
	dataPersonalRequested,
	dataPersonalPosted,
	dataPersonalError,
	photoPersonalRequested,
	photoPersonalPosted,
	photoPersonalError
};