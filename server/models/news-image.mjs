import {Entity, Schema} from 'redis-om';
import client from './client.mjs';

class NewsImage extends Entity {}

const newsImageSchema = new Schema(NewsImage, {
	image: {type: 'string'},
	imageType: {type: 'string'},
	nameFileImage: {type: 'string'}
});

const newsImageRepository = client.fetchRepository(newsImageSchema);
await newsImageRepository.createIndex();

export {newsImageRepository};