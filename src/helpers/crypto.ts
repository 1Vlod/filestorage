import crypto from 'crypto';
import config from '../config.json';

const algorithm = 'aes-256-cbc';
const vector = config.initVector || 'MySuperSecretKey';
const key = config.securityKey || 'MySuperSecretKey';

const initVector = crypto
  .createHash('sha256')
  .update(vector)
  .digest('base64')
  .slice(0, 16);

const securityKey = crypto
  .createHash('sha256')
  .update(key)
  .digest('base64')
  .slice(0, 32);

const cipher = () => {
  return crypto.createCipheriv(algorithm, securityKey, initVector);
};

const decipher = () => {
  return crypto.createDecipheriv(algorithm, securityKey, initVector);
};
export { cipher, decipher };
