import {combineReducers} from 'redux';

import updatePersonalData from './personal-data';
import updateNews from './news';
import updateUsers from './users';

export default combineReducers({
	personalData: updatePersonalData,
	news: updateNews,
	users: updateUsers
});