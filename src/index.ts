import { createServer } from 'http';
import { existsSync, mkdirSync } from 'fs';
import { fileController } from './controller/fileService';
import { SERVER_PORT, UPLOADS_DIR_NAME } from './constants';

const server = createServer((req, res) => {
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);

  try {
    const url = req.url?.split('/');
    if (url?.[1] === 'file') {
      switch (req.method) {
        case 'GET': {
          if (url[2]) {
            fileController.get(res, url[2]);
          }
          break;
        }
        case 'POST': {
          fileController.save(req, res);
          break;
        }
        case 'DELETE': {
          if (url[2]) {
            fileController.delete(res, url[2]);
          }
          break;
        }
      }
      return;
    }

    res.statusCode = 404;
    res.end(
      JSON.stringify({
        statusCode: 404,
        error: 'Not Found',
        message: 'Not Found',
      })
    );
    return;
  } catch (error) {
    console.log('error', error);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        statusCode: 500,
        error: 'Internal server error',
        message: JSON.stringify(error),
      })
    );
  }
});

server.listen(SERVER_PORT, () => {
  if (!existsSync(UPLOADS_DIR_NAME)) {
    mkdirSync(UPLOADS_DIR_NAME);
  }
  console.log(`Server started on ${SERVER_PORT} port`);
});
