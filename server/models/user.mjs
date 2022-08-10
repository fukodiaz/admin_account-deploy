import {Entity, Schema} from 'redis-om';
import client from './client.mjs';

class User extends Entity {}

const userSchema = new Schema(User, {
	fio: {type: 'string'},
	position: {type: 'string'},
	email: {type: 'string'},
	phone: {type: 'string'},
	department: {type: 'string'},	
	password: {type: 'string'}
});

const userRepository = client.fetchRepository(userSchema);
await userRepository.createIndex();

export {userRepository};