const openBlock = (state, action) => {
	switch (action.blockName) {
		case 'directories':
			return {
				flagOpenDirectories: !state.flagOpenDirectories
			}
		case 'users': 
			const curDepartments = selectCurretDepartments(state.listOffices, "educational");
			return {
				flagShowUsers: !state.flagShowUsers,
				isActiveOffice: "educational",
				totalPaginBtns: Math.ceil(state.visibleUsersList.length/2),
				startPagin: 1,
				activeIdxPagin: 0,
				curSelectedPage: 1,
				currentDepartments: curDepartments
			}
		
		default: return {}
	}
};

const inputValueDefine = (state, {fieldName, payload}) => {
	switch (fieldName) {
		case 'searchTitle': 
			return {
				searchTitle: payload,
				visibleListTitle:	defineVisibleListTitle(searchTitles(state.listTitleDirect, payload), 5)
			}
		case 'position_user':
			return {
				position: payload
			}
		case 'department_user':
			return {
				department: payload
			}
		case 'fio_user':
			return {
				fioUser: payload
			}
		case 'email_user':
			return {
				emailUser: payload
			}
		case 'phone_user':
			return {
				phoneUser: payload
			}
		case 'password_user':
			return {
				passwordUser: payload
			}

		case 'searchUsers':
			return {
				searchUsers: payload
			}

		default: return {}
	}
};

const defineVisibleItems = (flagAllItems, itemsList, quantity) => {
	switch (flagAllItems) {
		case true:
			return itemsList
		case false:
			return itemsList.slice(0, quantity)
	}
};

function defineVisibleListTitle(listTitle, quantity) {
	return listTitle.sort((a, b) => b.id - a.id).slice(0, quantity);
}

function searchTitles(listTitles, term) {
	if (term === '') {
		return listTitles;
	}

	return listTitles.map(item => item)
							.filter(({title}) => title.toLowerCase()
																.indexOf(term.toLowerCase()) > -1);
}

function selectListDirect(listDirects, entityId) {
	switch (entityId) {
		case 'Offices': 
			return listDirects.filter(({entityId}) => entityId === "Offices")
									.map(({list}) => list)[0];
		case 'positions':
			return listDirects.filter(({entityId}) => entityId === "positions")
									.map(({list}) => list)[0];
	}
} 


function selectCurretDepartments(listOffices, isActiveOffice) {
	return listOffices.filter(({entityId}) => entityId === isActiveOffice)
								.map(({listDivision, title}) => [title.toLowerCase(), ...listDivision])[0];
}

function defineActiveOffice({listOffices}, department) {
	return listOffices.filter(office => { //return obj with an active Office
		let {title, listDivision} = office;
		listDivision = [title.toLowerCase(), ...listDivision];
		let flagOffice = listDivision.some(label => label === department);
		if (flagOffice) {
			return office;
		}
		return null;
	})[0];
}

const filterUsersByOffice = (user, idx, arr, state, isActiveOffice) => {
	const {department} = user;
	const activeOffice = defineActiveOffice(state, department);
	if (isActiveOffice === activeOffice.entityId) {
		return user;
	}
	return null;
};

function searchingUsers(listUsers, term) {
	if (term === '') {
		return listUsers;
	}

	return listUsers.filter(user => {
		const {fio, email} = user;
		const fioChecked = fio.toLowerCase().indexOf(term.toLowerCase()); 
		const emailChecked = email.toLowerCase().indexOf(term.toLowerCase());
		if (fioChecked > -1 || emailChecked > -1) { return user; }
		return null;
	});
}

function defineShowingUsers(visibleListUsers, activeIdx, quantity) { //quantity users on 1 page
	// const quantityPages = Math.ceil(visibleListUsers.length/quantity);
	return [...visibleListUsers.slice(quantity*activeIdx, (activeIdx+1)*quantity)];
}

const addIndexObj = (item, index) => ({
	index: index + 1, ...item
});

export {
	openBlock,
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
	addIndexObj
};