import {Router} from 'express';
import {userRepository} from '../models/user.mjs';
import client from '../models/client.mjs';

export const router = Router();

const mapDataUser = (user) => {
	if (user.password) {
		user.password = 'Получен';
	} else {
		user.password = 'Отсутствует';
	}
	if (!user.phone) {
		user.phone = 'Отсутствует';
	} 
	return user;
};

router.get('/', async (req, res) => {
	let result = JSON.parse(await client.execute(['JSON.GET', 'usersList']));
	result = result.map(mapDataUser);
	
	res.send(JSON.stringify(result));
});

router.post('/', async(req, res) => {
	let userData = userRepository.createEntity();
	userData.fio = req.body.fio_user;
	userData.position = req.body.position_user;
	userData.email = req.body.email_user;
	userData.phone = req.body.phone_user;
	userData.department = req.body.department_user;
	userData.password = req.body.password_user;

	let id = await userRepository.save(userData);
	let result = await client.execute(['JSON.GET', `User:${id}`]);
	result = {entityId: id, ...JSON.parse(result)};

	const prevUsersList = await client.execute(['JSON.GET', 'usersList']);
	const novelUsersList = [result, ...JSON.parse(prevUsersList)];
	
	await client.execute(['JSON.SET', 'usersList', '$', JSON.stringify(novelUsersList)]);
	let novelDataUsersList = await client.execute(['JSON.GET', 'usersList']);
	novelDataUsersList = JSON.parse(novelDataUsersList).map(mapDataUser);

	res.send(JSON.stringify(novelDataUsersList));
});

router.put('/:id', async(req, res) => {
	const userId = req.params.id;
	const prevUsersList = JSON.parse(await client.execute(['JSON.GET', 'usersList']));
	const prevUser = prevUsersList.find(({entityId}) => entityId === userId);
	const userIndex = prevUsersList.findIndex(({entityId}) => entityId === userId);
	const novelUser = {...prevUser};

	novelUser.fio = req.body.fio_user;
	novelUser.position = req.body.position_user;
	novelUser.email = req.body.email_user;
	novelUser.phone = req.body.phone_user;
	novelUser.department = req.body.department_user;
	novelUser.password = req.body.password_user;

	const novelUsersList = [...prevUsersList.slice(0, userIndex), novelUser, ...prevUsersList.slice(userIndex + 1)];
	await client.execute(['JSON.SET', 'usersList', '$', JSON.stringify(novelUsersList)]);
	let novelDataUsersList = await client.execute(['JSON.GET', 'usersList']);
	novelDataUsersList = JSON.parse(novelDataUsersList).map(mapDataUser);

	res.send(JSON.stringify(novelDataUsersList));
});

router.delete('/:id', async(req, res) => {
	const userId = req.params.id;
	const prevUsersList = JSON.parse(await client.execute(['JSON.GET', 'usersList']));
	const userIndex = await prevUsersList.findIndex(({entityId}) => entityId === userId);

	await client.execute(['JSON.DEL', 'usersList', `$[${userIndex}]`]);
	let novelDataUsersList = await client.execute(['JSON.GET', 'usersList']);
	novelDataUsersList = JSON.parse(novelDataUsersList).map(mapDataUser);

	res.send(JSON.stringify(novelDataUsersList));
});