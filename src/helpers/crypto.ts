// crypto module
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const vector = '';
const key = '';

const initVector = vector
  ? crypto.randomBytes(16)
  : crypto
      .createHash('sha256')
      .update('MySuperSecretKey')
      .digest('base64')
      .slice(0, 16);

const securityKey = key
  ? crypto.randomBytes(32)
  : crypto
      .createHash('sha256')
      .update('MySuperSecretKey')
      .digest('base64')
      .slice(0, 32);

const cipher = () => {
  return crypto.createCipheriv(algorithm, securityKey, initVector);
};

const decipher = () => {
  return crypto.createDecipheriv(algorithm, securityKey, initVector);
};
export { cipher, decipher };
