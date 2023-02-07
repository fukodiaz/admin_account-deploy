import {openBlock,
	inputValueDefine,
	defineVisibleItems,
	defineVisibleListTitle,
	searchTitles,
	selectListDirect,
	selectCurretDepartments,
	defineActiveOffice,
	filterUsersByOffice,
	searchingUsers,
	defineShowingUsers,
	addIndexObj} from './reducer-utils';

const initialState = {
	flagOpenDirectories: true,

	directoriesList: null,
	directoriesLoading: false,
	directoriesError: false,
	visibleDirectories: null,
	flagAllDirectories: false,

	labelSearchDirect: null,
	listTitleDirect: null,
	typeDirect: null,
	entityIdDirect: null,
	visibleListTitle: null,

	searchTitle: '',
	additTitle: '',

	titlePutInit: false,
	titlePutError: false,

	////////

	flagShowUsers: true,

	listOffices: null,
	isActiveOffice: "educational",
	currentDepartments: null,
	listPositions: null,

	usersList: null,
	usersListLoading: false,
	usersListError: false,
	visibleUsersList: [],
	showingUsersList: [],

	headingModalUser: null,
	methodUser: null,
	position: '',
	department: '',
	fioUser: '',
	emailUser: '',
	phoneUser: '',
	passwordUser: '',
	userId: null,

	userDataLoading: false,
	userDataError: false,

	userPutInit: false,
	userPutError: false,

	IdUserDeleted: null,
	userDeleteInit: false,
	userDeleteError: false,

	searchUsers: '',

	startPagin: 1,
	activeIdxPagin: 0,
	curSelectedPage: 1,
	totalPaginBtns: null, // total quantity of buttons 
};


const updateUsers = (state = initialState, action) => {

	switch (action.type) {
		case 'FETCH_DIRECTORIES_REQUEST':
			return {
				...state,
				directoriesList: null,
				directoriesLoading: true,
				directoriesError: false,
				visibleDirectories: null
			}

		case 'FETCH_DIRECTORIES_SUCCESS':
			const {flagAllDirectories, isActiveOffice} = state;
			const listOffices =  selectListDirect(action.payload, 'Offices');

			return {
				...state,
				directoriesList: action.payload,
				directoriesLoading: false,
				directoriesError: false,
				visibleDirectories: defineVisibleItems(flagAllDirectories, action.payload, 2),
				flagAllDirectories: !flagAllDirectories,
				listOffices,
				currentDepartments: selectCurretDepartments(listOffices, isActiveOffice),
				listPositions: selectListDirect(action.payload, 'positions')
			}

		case 'FETCH_DIRECTORIES_FAILURE':
			return {
				...state,
				directoriesList: null,
				directoriesLoading: false,
				directoriesError: action.payload,
				visibleDirectories: null
			}

		case 'SHOW_ALL_DIRECTORIES': {
			const {flagAllDirectories, directoriesList} = state;
			return {
				...state,
				flagAllDirectories: !flagAllDirectories,
				visibleDirectories: defineVisibleItems(flagAllDirectories, directoriesList, 2)
			}
		}

		case 'OPEN_MODAL_DIRECTORIES':
			const {list, label, type, entityId} = action.payload;
			const listTitleDirect = list
												.map((title, id) => {
													if (entityId === 'Offices') {
														return {id: ++id, 'title': title.title}
													}
													return {id: ++id, title}}); //array with objs consists of id and title

			return {
				...state,
				labelSearchDirect: label,
				additTitle: '',
				listTitleDirect,
				typeDirect: type,
				entityIdDirect: entityId,
				visibleListTitle: defineVisibleListTitle(listTitleDirect, 5) 
				//listTitleDirect.sort((a, b) => b.id - a.id).slice(0, 5)
			}

		case 'ADDIT_INPUT_CHANGED':
			return {
				...state,
				additTitle: action.payload
			}

		case 'PUT_TITLE_REQUEST':
			return {
				...state,
				titlePutInit: true,
				titlePutError: false,
			}

		case 'PUT_TITLE_SUCCESS':
			const listTitles = action.payload.map((title, id) => ({id: ++id, title}));
			return {
				...state,
				titlePutInit: false,
				titlePutError: false,
				listTitleDirect: listTitles,
				visibleListTitle: defineVisibleListTitle(listTitles, 5),
				additTitle: ''
			}

		case 'PUT_TITLE_FAILURE':
			return {
				...state,
				titlePutInit: false,
				titlePutError: action.payload
			}
		//////


		case 'FILTER_OFFICES':
			const {payload} = action;
			console.log(payload, 999);
			let visibleUsersList = state.usersList?.filter(
											(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, payload));
			visibleUsersList = visibleUsersList?.map(addIndexObj);
			const totalPaginBtns = visibleUsersList.length ? Math.ceil(visibleUsersList.length/2) : 0;
			return {
				...state,
				isActiveOffice: payload,
				currentDepartments: selectCurretDepartments(state.listOffices, payload),
				visibleUsersList,
				startPagin: 1,
				activeIdxPagin: 0,
				showingUsersList: defineShowingUsers(visibleUsersList, 0, 2),
				curSelectedPage: 1,
				totalPaginBtns
			}

		case 'FETCH_USERS_DATA_REQUEST': 
			return {
				...state,
				usersList: null,
				usersListLoading: true,
				usersListError: false,
				visibleUsersList: []
			}

		case 'FETCH_USERS_DATA_SUCCESS':
			let visUsersList = action.payload?.filter(
						(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			visUsersList = visUsersList?.map(addIndexObj);
			console.log(action?.payload, 222);
			return {
				...state,
				usersList: action.payload,
				usersListLoading: false,
				usersListError: false,
				visibleUsersList: visUsersList,
				showingUsersList: defineShowingUsers(visUsersList, state.activeIdxPagin, 2),
				totalPaginBtns: Math.ceil(visUsersList.length/2)
			}

		case 'FETCH_USERS_DATA_FAILURE':
			console.log(action?.payload, 'err-users');
			return {
				...state,
				usersList: null,
				visibleUsersList: [],
				usersListLoading: false,
				usersListError: action.payload
			}

		case 'OPEN_MODAL_NEW_USER':
			return {
				...state,
				headingModalUser: 'headingNewUser',
				methodUser: 'POST',
				position: null,
				department: null,
				fioUser: '',
				emailUser: '',
				phoneUser: '',
				passwordUser: '',
			}

		case 'USER_DATA_REQUEST':
			return {
				...state,
				userDataLoading: true,
				userDataError: false,
			}

		case 'USER_DATA_SUCCESS':
			let visualUsersList = action.payload?.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			visualUsersList = visualUsersList?.map(addIndexObj);
			return {
				...state,
				usersList: action.payload,
				visibleUsersList: visualUsersList,
				userDataLoading: false,
				userDataError: false,
				showingUsersList: defineShowingUsers(visualUsersList, state.activeIdxPagin, 2),
				totalPaginBtns: Math.ceil(visualUsersList.length/2)
			}
		
		case 'USER_DATA_FAILURE':
			return {
				...state,
				userDataLoading: false,
				userDataError: action.payload
			}

		case 'OPEN_MODAL_EDIT_USER':
			const {fio, department, position, email, phone, password} = action.payload;
			const activeOffice = defineActiveOffice(state, department); //full obj with an Office
			const curDepartments = [activeOffice.title.toLowerCase(), ...activeOffice.listDivision];
			return {
				...state,
				headingModalUser: 'headingEditUser',
				methodUser: 'PUT',
				position: {value: position, label: position},
				department: {value: department, label:department},
				fioUser: fio,
				emailUser: email,
				phoneUser: phone,
				passwordUser: password,
				userId: action.payload.entityId,
				isActiveOffice: activeOffice.entityId,
				currentDepartments: curDepartments
			}

		case 'PUT_USER_DATA_REQUEST':
			return {
				...state,
				userPutInit: true,
				userPutError: false
			}

		case 'PUT_USER_DATA_SUCCESS':
			let viUsersList = action.payload?.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			viUsersList = viUsersList?.map(addIndexObj);
			return {
				...state,
				userPutInit: false,
				usersList: action.payload,
				visibleUsersList: viUsersList,
				userPutError: false,
				showingUsersList: defineShowingUsers(viUsersList, state.activeIdxPagin, 2),
				totalPaginBtns: Math.ceil(viUsersList.length/2)
			}	

		case 'PUT_USER_DATA_FAILURE':
			return {
				...state,
				userPutInit: false,
				userPutError: action.payload
			}

		case 'ADD_ID_USER_DELETED': 
			return {
				...state,
				IdUserDeleted: action.payload,
				pieceDeletedHeader: 'данные сотрудника',
			}

		case 'DELETE_USER_REQUEST':
			return {
				...state,
				userDeleteInit: true,
				userDeleteError: false
			}

		case 'DELETE_USER_SUCCESS': 
			let vUsersList = action.payload?.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			vUsersList = vUsersList?.map(addIndexObj);
			return {
				...state,
				userDeleteInit: false,
				usersList: action.payload,
				visibleUsersList: vUsersList,
				userDeleteError: false,
				showingUsersList: defineShowingUsers(vUsersList, state.activeIdxPagin, 2),
				totalPaginBtns: Math.ceil(vUsersList.length/2)
			}

		case 'DELETE_USER_FAILURE':
			return {
				...state,
				userDeleteInit: false,
				userDeleteError: action.payload
			}

		case 'ON_SEARCH_USERS':
			const visibUsersList = state.usersList?.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			let searchUsersList = searchingUsers(visibUsersList, state.searchUsers);
			searchUsersList = searchUsersList?.map(addIndexObj);
			return {
				...state,
				visibleUsersList: searchUsersList,
				showingUsersList: defineShowingUsers(searchUsersList, 0, 2),
				totalPaginBtns: Math.ceil(searchUsersList.length/2),
				activeIdxPagin: 0,
				startPagin: 1,
				curSelectedPage: 1
			}

		case 'ON_BTN_ARROW':
			const {startShift = 0, activeIdxShift = 0} = action.payload;
			const curActiveIdx = state.activeIdxPagin + activeIdxShift;
			return {
				...state,
				startPagin: state.startPagin + startShift,
				activeIdxPagin: curActiveIdx,
				showingUsersList: defineShowingUsers(state.visibleUsersList, curActiveIdx, 2),
				curSelectedPage: curActiveIdx + 1
			}

		case 'ON_BTN_PAGIN': 
			return {
				...state,
				activeIdxPagin: action.payload,
				showingUsersList: defineShowingUsers(state.visibleUsersList, action.payload, 2),
				curSelectedPage: action.payload + 1
			}

		case 'ON_LAST_BTN_PAGIN':
			const {active, start} = action.payload;
			return {	
				...state,
				activeIdxPagin: active,
				startPagin: start,
				showingUsersList: defineShowingUsers(state.visibleUsersList, active, 2),
				curSelectedPage: active + 1
			}

		case 'SELECT_CHANGED':
			const activeId = action.payload.value - 1;
			return {
				...state,
				curSelectedPage: action.payload,
				activeIdxPagin: activeId,
				showingUsersList: defineShowingUsers(state.visibleUsersList, activeId, 2),
				startPagin: action.start
			}

		case 'OPEN_BLOCK':
			return {
				...state,
				...openBlock(state, action)
			}

		case 'INPUT_CHANGED':
			return {
				...state,
				...inputValueDefine(state, action) 
			}

		default:
			return state;
	}
};

export default updateUsers;