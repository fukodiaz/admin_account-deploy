import {
	openBlock,
	inputChanged
} from './general';

import {
	editingPersonalData,
	dataPersonalRequested,
	dataPersonalPosted,
	dataPersonalError,
	photoPersonalRequested,
	photoPersonalPosted,
	photoPersonalError
} from './personal-data';

import {
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
	addIdNewsDeleted,
} from './news';

import {
	fetchDirectories,
	showAllDirectories,
	openModalDirectories,
	additInputChanged,
	putTitleRequested,
	putTitleSuccess,
	putTitleError
} from './directories';

import {
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
} from './users';

export {
	openBlock,
	inputChanged,

	editingPersonalData,
	dataPersonalRequested,
	dataPersonalPosted,
	dataPersonalError,
	photoPersonalRequested,
	photoPersonalPosted,
	photoPersonalError,

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
	addIdNewsDeleted,

	fetchDirectories,
	showAllDirectories,
	openModalDirectories,
	additInputChanged,
	putTitleRequested,
	putTitleSuccess,
	putTitleError,

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