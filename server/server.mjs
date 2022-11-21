import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import createPath from './helpers/create-path.mjs';
import rewrite from 'express-urlrewrite';

import {router as personalDataRouter} from './routers/personal-data-router.mjs';
import {router as personalPhotoRouter} from './routers/personal-photo-router.mjs';
import {router as newsImageRouter} from './routers/news-image-router.mjs';
import {router as newsRouter} from './routers/news-router.mjs';
import {router as directoriesRouter} from './routers/directories-router.mjs';
import {router as usersRouter} from './routers/users-router.mjs';

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
	origin: 'https://admin-account.herokuapp.com/', //'https://admin-account.herokuapp.com/'  'http//localhost:8081/'
	//credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('dist')); //'/usr/src/app/dist' - docker_version
app.use(rewrite('/api/*', '/$1'));

app.use('/personalData', personalDataRouter);
app.use('/personalPhoto', personalPhotoRouter);
app.use('/newsImage', newsImageRouter);
app.use('/newsData', newsRouter);
app.use('/directories', directoriesRouter);
app.use('/users', usersRouter);

app.listen(PORT);

app.get('/', (req, res) => {
	res.sendFile(createPath('index'));
	//res.sendFile('/usr/src/app/dist/index.html'); //docker_version
});

app.use((req, res) => {
	res
		.status(404)
		.send('<h1>Error</h1>')
});