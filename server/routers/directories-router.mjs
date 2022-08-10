import {Router} from 'express';
import client from '../models/client.mjs';

export const router = Router();

router.get('/', async (req, res) => {
	const result = await client.execute(['JSON.GET', 'directoriesList']);
	res.send(result);
});

router.put('/:id', async(req, res) => {
	const id = req.params.id;
	const title = req.body.title;
	const prevDirectoriesList = JSON.parse(await client.execute(['JSON.GET', 'directoriesList']));
	const index = await prevDirectoriesList.findIndex(({entityId}) => entityId === id);
	
	await client.execute(['JSON.ARRAPPEND', 'directoriesList', `$[${index}].list`, JSON.stringify(title)]);
	let newListDirectory = await client.execute(['JSON.GET', 'directoriesList', `$[${index}].list`]);
	newListDirectory = JSON.stringify(JSON.parse(await newListDirectory)[0]);
	
	res.send(newListDirectory);
});