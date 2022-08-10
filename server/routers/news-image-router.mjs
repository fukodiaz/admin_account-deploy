import {Router} from 'express';
import { newsImageRepository } from '../models/news-image.mjs';

import busboy from 'connect-busboy';

export const router = Router();

router.post('/', busboy({immediate: true}), async(req, res, next) => {

	let newsImage = newsImageRepository.createEntity();
	
	let image = null;
	let imageType = null;
	let nameFileImage = null;

	req.busboy.on('file', (fieldName, file, info) => {
		//file.resume();	
		imageType = info.mimeType;
		nameFileImage = info.filename;

		file.on('data', (data) => {
			if (image === null) {
				image = data;
			} else {
				image = Buffer.concat([image, data]);
			}
		});
	});


	req.busboy.on('finish', async () => {
		//if (!photoData) next(new Error('file binary data cannot be null'));

		newsImage.image = image.toString('base64');
		newsImage.imageType = imageType;
		newsImage.nameFileImage = nameFileImage;

		let id = await newsImageRepository.save(newsImage);

		res.send(await newsImageRepository.fetch(id));
	});
});