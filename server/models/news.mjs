import {Entity, Schema} from 'redis-om';
import client from './client.mjs';

class News extends Entity {}

const newsSchema = new Schema(News, {
	theme: {type: 'string'},
	text: {type: 'string'},
	date: {type: 'string'},
	image: {type: 'string'},
	urlImage: {type: 'string'},
	imageType: {type: 'string'},
	nameFileImage: {type: 'string'}, 
});

const newsRepository = client.fetchRepository(newsSchema);
await newsRepository.createIndex();

export {newsRepository};