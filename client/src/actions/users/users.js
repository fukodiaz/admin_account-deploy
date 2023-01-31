const filterOffices = (payload) => ({
	type: 'FILTER_OFFICES',
	payload
});

const usersDataRequested = () => ({type: 'FETCH_USERS_DATA_REQUEST'});

const usersDataLoaded = (payload) => ({
		type: 'FETCH_USERS_DATA_SUCCESS',
		payload
});

const usersDataError = (payload) => ({
	type: 'FETCH_USERS_DATA_FAILURE',
	payload
});

const fetchUsersData = (methodService, dispatch) => () => {
	dispatch(usersDataRequested());
	methodService()
		.then(data => dispatch(usersDataLoaded(data)))
		.catch(error => dispatch(usersDataError(error)));
};

const openModalNewUser = () => ({type: 'OPEN_MODAL_NEW_USER'});

const openModalEditUser = (payload) => ({
	type: 'OPEN_MODAL_EDIT_USER',
	payload
});

const userDataRequested = () => ({type: 'USER_DATA_REQUEST'});

const userDataSuccess = (payload) => ({
	type: 'USER_DATA_SUCCESS',
	payload
}); 

const userDataError = (payload) => ({
	type: 'USER_DATA_FAILURE',
	payload
});

const putUserDataRequested = () => ({type: 'PUT_USER_DATA_REQUEST'});

const putUserDataSuccess = (payload) => ({
	type: 'PUT_USER_DATA_SUCCESS',
	payload
}); 

const putUserDataError = (payload) => ({
	type: 'PUT_USER_DATA_FAILURE',
	payload
});

const addIdUserDeleted = (payload) => ({
	type: 'ADD_ID_USER_DELETED',
	payload
});

const userDeleteRequested = () => ({type: 'DELETE_USER_REQUEST'});

const userDeleted = (payload) => ({
	type: 'DELETE_USER_SUCCESS',
	payload
});

const userDeleteError = (payload) => ({
	type: 'DELETE_USER_FAILURE',
	payload
});

const onSearchUsers = () => ({type: 'ON_SEARCH_USERS'});

const onBtnArrow = (payload) => ({
	type: 'ON_BTN_ARROW',
	payload
});

const onBtnPagin = (payload) => ({
	type: 'ON_BTN_PAGIN',
	payload
});

const onLastBtnPagin = (payload) => ({
	type: 'ON_LAST_BTN_PAGIN',
	payload
});

const selectChanged = (payload, name, start) => ({
	type: 'SELECT_CHANGED',
	payload,
	name,
	start
});

export {
	filterOffices,
	fetchUsersData,
	openModalNewUser,
	openModalEditUser,
	userDataRequested,
	userDataSuccess,
	userDataError,
	putUserDataRequested,
	putUserDataSuccess,
	putUserDataError,
	addIdUserDeleted,
	userDeleteRequested,
	userDeleted,
	userDeleteError,
	onSearchUsers,
	onBtnArrow,
	onBtnPagin,
	onLastBtnPagin,
	selectChanged
};