import { createServer } from 'http';

const SERVER_PORT = 8080;

const server = createServer((req, res) => {
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);

  if (req.url === '/file') {
    switch (req.method) {
      case 'GET': {
        break;
      }
      case 'POST': {
        break;
      }
      case 'DELETE': {
        break;
      }
    }
    res.statusCode = 200;
    res.end('We got your request!');
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
