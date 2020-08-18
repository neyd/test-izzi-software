//WEBSITE INFO
const WEB_URL = '127.0.0.1'
const WEB_PORT = '3000'
const WEB_SOCKET = 'http'

// IMPORT SITE INFO
const IMPORT_URL = 'jsonplaceholder.typicode.com'
const IMPORT_PORT = '80'
const IMPORT_SOCKET = 'http'


const config = {
    WEB_URL: `${WEB_SOCKET}://${WEB_URL}:${WEB_PORT}`,
    IMPORT_URL: `${IMPORT_SOCKET}://${IMPORT_URL}:${IMPORT_PORT}`,
}

export default config