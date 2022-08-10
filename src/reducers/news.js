const initialState = {
	flagOpenNews: true,
	headingModal: null,
	methodNews: null,
	entityId: null,

	newsList: null,
	newsListLoading: false,
	newsListError: false,
	visibleNewsList: null,
	flagAllNews: false,

	newsImage: null,
	newsImageSending: false,
	newsImageError: false,

	newsData: null,
	newsDataSending: false,
	newsDataError: false,

	newsPutInit: false,
	newsPutError: false,

	newsDeleteInit: false,
	newsDeleteError: false,

	theme: '',
	text: '',
	urlImage: '',
	nameFileImage: '',
	flagImageFile: false,

	IdNewsDeleted: null,
	pieceDeletedHeader: null,
};

const openBlock = (state, action) => {
	switch (action.blockName) {
		case 'newsEditing':
			return {
				flagOpenNews: !state.flagOpenNews
			}
		
		default: return {}
	}
};

const inputValueDefine = ({fieldName, payload}) => {
	switch (fieldName) {
		case 'theme': 
			return {
				theme: payload
			}
		case 'text': 
			return {
				text: payload
			}
		case 'url': 
			return {
				urlImage: payload
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


const updateNews = (state = initialState, action) => {

	switch (action.type) {
		case 'OPEN_MODAL_CREATION_NEWS':
			return {
				...state,
				headingModal: 'Создать новость',
				methodNews: 'POST',
				theme: '',
				text: '',
				urlImage: '',
				nameFileImage: '',
				flagImageFile: false
			}

		case 'OPEN_MODAL_EDIT_NEWS':
			const {theme, text, urlImage, nameFileImage} = action.payload;
			return {
				...state,
				headingModal: 'Редактировать новость',
				methodNews: 'PUT',
				entityId: action.payload.entityId,
				theme: theme || '',
				text: text || '',
				urlImage: urlImage || '',
				nameFileImage: nameFileImage || null,
				flagImageFile: false
			}

		case 'FETCH_NEWS_LIST_REQUEST':
			return {
				...state,
				newsList: null,
				newsListLoading: true,
				newsListError: false,
			}
			
		case 'FETCH_NEWS_LIST_SUCCESS':
			const {flagAllNews} = state;
			return {
				...state,
				newsList: action.payload,
				newsListLoading: false,
				newsListError: false,
				visibleNewsList: defineVisibleItems(flagAllNews, action.payload, 3),
				flagAllNews: !state.flagAllNews
			}

		case 'FETCH_NEWS_LIST_FAILURE':
			return {
				...state,
				newsList: null,
				newsListLoading: false,
				newsListError: action.payload,
			}

		case 'SHOW_ALL_NEWS':
			const {newsList} = state;
			return {
				...state,
				flagAllNews: !state.flagAllNews,
				visibleNewsList: defineVisibleItems(state.flagAllNews, newsList, 3) //defineVisibleNews(state)
			}

		case 'POST_NEWS_IMAGE_REQUEST':
			return {
				...state,
				newsImage: null,
				newsImageSending: true,
				newsImageError: false,
				flagImageFile: false
			}

		case 'POST_NEWS_IMAGE_SUCCESS':
			return {
				...state,
				newsImage: action.payload,
				newsImageSending: false,
				newsImageError: false,
				nameFileImage: action.payload.nameFileImage,
				flagImageFile: true
			}

		case 'POST_NEWS_IMAGE_FAILURE':
			return {
				...state,
				newsImage: null,
				newsImageSending: false,
				newsImageError: action.payload,
				flagImageFile: false
			}

		case 'POST_NEWS_DATA_REQUEST':
			return {
				...state,
				//newsData: null,
				newsDataSending: true,
				newsDataError: false
			}

		case 'POST_NEWS_DATA_SUCCESS':
			return {
				...state,
				//newsData: action.payload,
				newsList: action.payload,
				visibleNewsList: action.payload.slice(0, 3),
				newsDataSending: false,
				newsDataError: false
			}

		case 'POST_NEWS_DATA_FAILURE':
			return {
				...state,
				//newsData: null,
				newsDataSending: false,
				newsDataError: action.payload
			}


		case 'PUT_NEWS_REQUEST':
			return {
				...state,
				newsPutInit: true,
				newsPutError: false,
			}
	
		case 'PUT_NEWS_SUCCESS':
			return {
				...state,
				newsList: action.payload,
				visibleNewsList: action.payload.slice(0, 3),
				newsPutInit: false,
				newsPutError: false
			}

		case 'PUT_NEWS_FAILURE':
			return {
				...state,
				newsPutInit: false,
				newsPutError: action.payload
			}

		case 'DELETE_NEWS_REQUEST':
			return {
				...state,
				newsDeleteInit: true,
				newsDeleteError: false,
			}

		case 'DELETE_NEWS_SUCCESS':
			return {
				...state,
				newsList: action.payload,
				visibleNewsList: action.payload.slice(0, 3),
				newsDeleteInit: false,
				newsDeleteError: false
			}

		case 'DELETE_NEWS_FAILURE':
			return {
				...state,
				newsDeleteInit: false,
				newsDeleteError: action.payload
			}

		case 'ADD_ID_NEWS_DELETED':
			return {
				...state,
				IdNewsDeleted: action.payload,
				pieceDeletedHeader: 'новость',
			}

		case 'OPEN_BLOCK':
			return {
				...state,
				...openBlock(state, action)
			}


		case 'INPUT_CHANGED':
			return {
				...state,
				...inputValueDefine(action) 
			}

		default:
			return state;
	}
};

export default updateNews;