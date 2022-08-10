import {Entity, Schema} from 'redis-om';
import client from './client.mjs';

class PersonalPhoto extends Entity {}

const personalPhotoSchema = new Schema(PersonalPhoto, {
	photo: {type: 'string'},
	imagePhotoType: {type: 'string'}
});

const personalPhotoRepository = client.fetchRepository(personalPhotoSchema);
await personalPhotoRepository.createIndex();

export {personalPhotoRepository};