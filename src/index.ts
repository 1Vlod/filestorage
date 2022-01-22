import { createServer } from 'http';
import {
  createWriteStream,
  createReadStream,
  existsSync,
  unlinkSync,
  mkdirSync,
  statSync,
} from 'fs';
import { cipher, decipher } from './helpers/crypto';
import { createGzip, createGunzip } from 'zlib';

const SERVER_PORT = 8080;
const UPLOADS_DIR_NAME = 'uploads';

const server = createServer((req, res) => {
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);
  console.log('headers', req.headers);

  const url = req.url?.split('/');
  if (url?.[1] === 'file') {
    switch (req.method) {
      case 'GET': {
        if (url[2]) {
          const filePath = `${UPLOADS_DIR_NAME}/file_${url[2]}.gz`;
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
          readStream.pipe(decipher()).pipe(createGunzip()).pipe(res);
        }

        break;
      }
      case 'POST': {
        const [_, id] = Math.random().toString().split('.');
        const filePath = `${UPLOADS_DIR_NAME}/file_${id}.gz`;

        req
          .pipe(createGzip())
          .pipe(cipher())
          .pipe(createWriteStream(filePath))
          .on('finish', () => {
            const size = statSync(filePath).size;
            const fileSizeInMegabytes = size / (1024 * 1024);
            res.end(
              `We got your file. Its id is ${id}. File size is ${fileSizeInMegabytes} MB`
            );
          });
        break;
      }
      case 'DELETE': {
        if (url[2]) {
          const filePath = `${UPLOADS_DIR_NAME}/file_${url[2]}`;
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
  if (!existsSync(UPLOADS_DIR_NAME)) {
    mkdirSync(UPLOADS_DIR_NAME);
  }
  console.log(`Server started on ${SERVER_PORT} port`);
});
