import {Router} from 'express';
import { personalPhotoRepository } from '../models/personal-photo.mjs';

import busboy from 'connect-busboy';

export const router = Router();

router.post('/', busboy({immediate: true}), async(req, res, next) => {

	let personalPhoto = personalPhotoRepository.createEntity();
	
	let photoData = null;
	let imagePhotoType = null;

	req.busboy.on('file', (fieldName, file, info) => {
		//file.resume();	
		imagePhotoType = info.mimeType;

		file.on('data', (data) => {
			if (photoData === null) {
				photoData = data;
			} else {
				photoData = Buffer.concat([photoData, data]);
			}
		});
	});


	req.busboy.on('finish', async () => {
		//if (!photoData) next(new Error('file binary data cannot be null'));

		personalPhoto.photo = photoData ? photoData.toString('base64') : null;
		personalPhoto.imagePhotoType = imagePhotoType;

		let id = await personalPhotoRepository.save(personalPhoto);

		res.send(await personalPhotoRepository.fetch(id));
	});
});