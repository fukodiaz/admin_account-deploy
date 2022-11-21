import {Router} from 'express';
import {newsRepository} from '../models/news.mjs';
import client from '../models/client.mjs';

import busboy from 'connect-busboy';

export const router = Router();

router.put('/:id', busboy({immediate: true}), async (req, res, next) => {

	let theme = null;
	let text = null;
	let image = null;
	let urlImage = null;
	let imageType = null;
	let nameFileImage = null;

	req.busboy.on('file', (fieldName, file, info) => {
		const {filename, mimeType} = info;
		imageType = mimeType;
		nameFileImage = filename;

		file.on('data', (data) => {
			if (image === null) {
				image = data;
			} else {
				image = Buffer.concat([image, data]);
			}
		});
	});

	req.busboy.on('field', (fieldName, value) => {
		switch(fieldName) {
			case 'theme':
				theme = value;
			case 'text':
				text = value;
			case 'url':
				urlImage = value;
		}
	});

	req.busboy.on('finish', async () => {
		const newsId = req.params.id;
		const prevNewsList = JSON.parse(await client.execute(['JSON.GET', 'newsList']));
		const prevNews = prevNewsList.find(({entityId}) => entityId === newsId);
		const newsIndex = prevNewsList.findIndex(({entityId}) => entityId === newsId);
		const novelNews = {...prevNews};

		novelNews.theme = theme;
		novelNews.text = text;
		novelNews.image = image ? image.toString('base64') : null;
		novelNews.imageType = imageType;
		novelNews.nameFileImage = nameFileImage;
		novelNews.urlImage = urlImage;
		
		const novelNewsList = [...prevNewsList.slice(0, newsIndex), novelNews, ...prevNewsList.slice(newsIndex + 1)];
		await client.execute(['JSON.SET', 'newsList', '$', JSON.stringify(novelNewsList)]);
		const novelDataNewsList = await client.execute(['JSON.GET', 'newsList']);

		res.send(novelDataNewsList);
	});
});





router.post('/', busboy({immediate: true}), async (req, res, next) => {
	//if (!req.busboy) throw new Error('file binary data cannot be null');
	let newsData = newsRepository.createEntity();

	let theme = null;
	let text = null;
	let image = null;
	let urlImage = null;
	let imageType = null;
	let nameFileImage = null;
	let date = new Date().toLocaleDateString();

	req.busboy.on('file', (fieldName, file, info) => {
		const {filename, mimeType} = info;
		imageType = mimeType;
		nameFileImage = filename;

		file.on('data', (data) => {
			if (image === null) {
				image = data;
			} else {
				image = Buffer.concat([image, data]);
			}
		});
	});

	req.busboy.on('field', (fieldName, value) => {
		switch(fieldName) {
			case 'theme':
				theme = value;
			case 'text':
				text = value;
			case 'url':
				urlImage = value;
		}
	});

	req.busboy.on('finish', async () => {
		//if (!photoData) next(new Error('file binary data cannot be null'));

		newsData.theme = theme;
		newsData.text = text;
		newsData.image = image ? image.toString('base64') : null;
		newsData.imageType = imageType || null;
		newsData.nameFileImage = nameFileImage || null;
		newsData.urlImage = urlImage || null;
		newsData.date = date;

		let id = await newsRepository.save(newsData);
		let result = await client.execute(['JSON.GET', `News:${id}`]);
		result = { 
			entityId: id,
			...JSON.parse(result)};
		
		const prevNewsList = await client.execute(['JSON.GET', 'newsList']);
		const novelNewsList = [result, ...JSON.parse(prevNewsList)];
		
		await client.execute(['JSON.SET', 'newsList', '$', JSON.stringify(novelNewsList)]);
		const novelDataNewsList = await client.execute(['JSON.GET', 'newsList']);

		res.send(novelDataNewsList);
	});

});

router.get('/', async (req, res) => {
	const result = await client.execute(['JSON.GET', 'newsList']);
	console.log(result, 22);
	res.send(result);
});

router.delete('/:id', async(req, res) => {
		const newsId = req.params.id;
		const prevNewsList = JSON.parse(await client.execute(['JSON.GET', 'newsList']));
		const newsIndex = await prevNewsList.findIndex(({entityId}) => entityId === newsId);

		await client.execute(['JSON.DEL', 'newsList', `$[${newsIndex}]`]);
		const novelDataNewsList = await client.execute(['JSON.GET', 'newsList']);

		res.send(novelDataNewsList);
});


