import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import fs, {promises} from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const PORT = process.env.PORT|| 3001;

const app = express();

if(process.env.NODE_ENV === 'development') {
    console.log('development mode');
} else {
    console.log('production mode');
}

// app.get('/', (req, res) => {
//   fs.readFile(path.join(__dirname, 'package.json'), 'utf-8', (err, content) => {
//     if (err) {
//       console.error(err);
//       } else {
//          res.send('<h1>Json text:</h1>' + content);
//       }
//   });
// });

app.get('/', async (req, res) => {
  try {
    const content = await promises.readFile(path.join(__dirname, 'package.json'), 'utf-8');
    res.send('<h1>Json text:</h1>' + content);
  } catch (err) {
    console.error(err);
    }
});


app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
})



