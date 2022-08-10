import path from 'path';
//import {fileURLToPath} from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const createPath = (page) => path.resolve(__dirname,'dist',`${page}.html`);

export default createPath;