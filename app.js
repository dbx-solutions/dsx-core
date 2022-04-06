import { getAuthUrl } from './src/util/auth/auth.js';

const client_id = '4jadbzm3a71wkfb';
const uri = 'http://localhost:8080/auth-test';

let result = getAuthUrl(client_id, uri).then((url) => {
    console.log(url)
}) 