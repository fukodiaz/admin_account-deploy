import {Router} from 'express';
import {personalDataRepository} from '../models/personal-data.mjs';

//import multer from 'multer';
//import busboy from 'busboy';
import busboy from 'connect-busboy';

export const router = Router();


router.post('/', busboy({immediate: true}), async (req, res, next) => { //multer().none()
	//if (!req.busboy) throw new Error('file binary data cannot be null');

	let personalData = personalDataRepository.createEntity();

	let photoData = null;
	let fio = null;
	let email = null;
	let imagePhotoType = null;

	req.busboy.on('file', (fieldName, file, info) => {
		const {filename, encoding, mimeType} = info;

		imagePhotoType = mimeType;
		console.log(`${filename},,,${encoding},,,${mimeType}`);

		file.on('data', (data) => {
			if (photoData === null) {
				photoData = data;
			} else {
				photoData = Buffer.concat([photoData, data]);
			}
		});
	});

	req.busboy.on('field', (fieldName, value) => {
		if (fieldName === 'fio') {
			fio = value;
		}

		if (fieldName === 'email') {
			email = value;
		}
	});

	req.busboy.on('finish', async () => {
		//if (!photoData) next(new Error('file binary data cannot be null'));

		personalData.fio = fio;
		personalData.email = email;
		personalData.photo = photoData ? photoData.toString('base64') : null;
		personalData.imagePhotoType = imagePhotoType;

		let id = await personalDataRepository.save(personalData);
		

		res.send(await personalDataRepository.fetch(id));
	});

	// personalData.fio = Object.entries(req.body).filter(item => item[0] === 'fio')[0][1] || null;
});