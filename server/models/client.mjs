import { createClient } from 'redis';
import {Client} from 'redis-om';

//const url = process.env.REDIS_URL || 'redis://redis:6379';
const {
	REDIS_HOST,
	REDIS_PORT,
	REDIS_USER,
	REDIS_PASSWORD
} = process.env;
const urlConfigDocker = {socket: {host: 'redis'}};
const urlConfigCloud = {
	socket: {
		host: REDIS_HOST,
		port: REDIS_PORT},
	password: REDIS_PASSWORD,
	username: REDIS_USER
};

const redis = createClient(urlConfigCloud, { return_buffers : true });
await redis.connect();
const client = await new Client().use(redis); 

//const client = new Client();
//await client.open(url);

export default client;