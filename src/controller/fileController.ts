import { ServerResponse, IncomingMessage } from 'http';
import { UPLOADS_DIR_NAME } from '../constants';
import {
  createWriteStream,
  createReadStream,
  existsSync,
  unlinkSync,
  statSync,
} from 'fs';
import { createGzip, createGunzip } from 'zlib';

import { cipher, decipher } from '../helpers/crypto';
import { pipeline } from 'stream';
import { countSize } from '../helpers/size';

class FileController {
  constructor() {}

  get(res: ServerResponse, id: string) {
    const filePath = `${UPLOADS_DIR_NAME}/file_${id}.gz`;
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
    pipeline(readStream, decipher(), createGunzip(), res, (err) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('Pipeline succeeded');
      }
    });
  }

  save(req: IncomingMessage, res: ServerResponse) {
    const [_, id] = Math.random().toString().split('.');
    const filePath = `${UPLOADS_DIR_NAME}/file_${id}.gz`;

    pipeline(
      req,
      createGzip(),
      cipher(),
      createWriteStream(filePath),
      (err) => {
        if (err) {
          console.log('err', err);
        } else {
          console.log('Pipeline succeeded');
          const size = statSync(filePath).size;
          res.end(
            JSON.stringify({
              message: 'We received your file',
              id,
              size: countSize(size),
            })
          );
        }
      }
    );
  }

  delete(res: ServerResponse, id: string) {
    const filePath = `${UPLOADS_DIR_NAME}/file_${id}.gz`;
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
    res.statusCode = 201;
    res.end(
      JSON.stringify({
        message: 'Your file was deleted successfully',
        status: 'OK',
      })
    );
  }
}

export const fileController = new FileController();
