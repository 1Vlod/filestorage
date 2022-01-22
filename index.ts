import { createServer } from 'http';
import {
  createWriteStream,
  createReadStream,
  existsSync,
  unlinkSync,
} from 'fs';

const SERVER_PORT = 8080;

const server = createServer((req, res) => {
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);
  console.log('headers', req.headers);

  const url = req.url?.split('/');
  if (url?.[1] === 'file') {
    switch (req.method) {
      case 'GET': {
        if (url[2]) {
          const filePath = `files/${url[2]}`;
          const fileExists = existsSync(filePath);
          if (!fileExists) {
            res.statusCode = 404;
            return res.end(
              JSON.stringify({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found file',
              })
            );
          }
          const readStream = createReadStream(filePath);
          readStream.pipe(res);
          return;
        }

        break;
      }
      case 'POST': {
        const [_, id] = Math.random().toString().split('.');
        const filePath = `files/file_${id}`;
        req.pipe(createWriteStream(filePath));
        req.addListener('end', () => {
          res.end(`We got your file. Its id is ${id}`);
        });
        break;
      }
      case 'DELETE': {
        if (url[2]) {
          const filePath = `files/${url[2]}`;
          const fileExists = existsSync(filePath);
          if (!fileExists) {
            res.statusCode = 404;
            return res.end(
              JSON.stringify({
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found file',
              })
            );
          }

          unlinkSync(filePath);
          res.end('Your file was deleted successfully');
          return;
        }

        break;
      }
    }
    res.statusCode = 200;
    return;
  }

  res.statusCode = 404;
  res.statusMessage = 'Not found';
  res.end(
    JSON.stringify({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    })
  );
  return;
});
server.listen(SERVER_PORT, () => {
  console.log(`Server started on ${SERVER_PORT} port`);
});
