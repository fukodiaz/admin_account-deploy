import {Entity, Schema} from 'redis-om';
import client from './client.mjs';

class PersonalData extends Entity {}

const personalDataSchema = new Schema(PersonalData, {
	photo: {type: 'string'},
	imagePhotoType: {type: 'string'},
	fio: {type: 'string'},
	email: {type: 'string'}
});

const personalDataRepository = client.fetchRepository(personalDataSchema);

await personalDataRepository.createIndex();

export {personalDataRepository};