# Filestorage

## Description

`GET /file/{id}` - Get the uncompressed and decrypted file by id.

`POST /file` - Save file in compressed and encrypted condition.
Return file id and size. Example: \
`{ "message": "We received your file", "id": "26405771625589614", "size": "48 B" }`

`DELETE /file/{id}` - Delete the file by id.

### Run locally

`npm install`

`npm start`

### Docker

`docker build -t test-filestorage .`

`docker run -it --rm -p 8080:8080 test-filestorage:latest`

### Config

You can add these variables as env variables or change them in `src/config.json`.

`PORT` - Port for running app. (If you change this var, you also need to change it in the dockerfile and in the command for running docker image)

`INIT_VECTOR` - Init vector for crypto ciphier and decipher.

`SECURITY_KEY` - Key for crypto ciphier and decipher.

### Big files

`createBigFile.js` - You can run this script to create a big files and test API with it. File is saved to testFiles/bigFile.txt

`node createBigFile.js`
