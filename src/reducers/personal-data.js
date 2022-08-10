const initialState = {
	flagEditingPersonal: true,
	flagOpenPersonal: true,

	dataPersonal: null,
	dataPersonalSending: false,
	dataPersonalError: false,

	photoPersonal: null,
	photoPersonalSending: false,
	photoPersonalError: false,

	fio: '',
	email: '',
};

const openBlock = (state, action) => {
	switch (action.blockName) {
		case 'personalData':
			return {
				flagOpenPersonal: !state.flagOpenPersonal,
				flagEditingPersonal: true
			}
		
		default: return {}
	}
};

const inputValueDefine = ({fieldName, payload}) => {
	switch (fieldName) {
		case 'fio':
			return {
				fio: payload
			}
		case 'email':
			return {
				email: payload
			}

		default: return {}
	}
};


function updatePersonalData(state = initialState, action) {

	switch (action.type) {
		case 'EDITING_PERSONAL_DATA': 
			return {
				...state,
				flagEditingPersonal: !state.flagEditingPersonal
			}

		case 'OPEN_BLOCK':
			return {
				...state,
				...openBlock(state, action)
			}

		case 'POST_DATA_PERSONAL_REQUEST':
			return {
				...state,
				dataPersonal: null,
				dataPersonalSending: true,
				dataPersonalError: false
			}

		case 'POST_DATA_PERSONAL_SUCCESS':
			return {
				...state,
				dataPersonal: action.payload,
				dataPersonalSending: false,
				dataPersonalError: false,
				flagEditingPersonal: true
			}

		case 'POST_DATA_PERSONAL_FAILURE':
			return {
				...state,
				dataPersonal: null,
				dataPersonalSending: false,
				dataPersonalError: action.payload
			}
		
		case 'POST_PHOTO_PERSONAL_REQUEST':
			return {
				...state,
				photoPersonal: null,
				photoPersonalSending: true,
				photoPersonalError: false
			}

		case 'POST_PHOTO_PERSONAL_SUCCESS':
			return {
				...state,
				photoPersonal: action.payload,
				photoPersonalSending: false,
				photoPersonalError: false
			}

		case 'POST_PHOTO_PERSONAL_FAILURE':
			return {
				...state,
				photoPersonal: null,
				photoPersonalSending: false,
				photoPersonalError: action.payload
			}

		case 'INPUT_CHANGED':
			return {
				...state,
				...inputValueDefine(action) 
			}

		default:
			return state;
	}
}

export default updatePersonalData;