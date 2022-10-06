const noop = () => {
};

const baseURL = 'http://89.208.198.137';
const port = 8080;

export default class Req {

    constructor() {
    }

    makeRequest = (url, options) => {
        return fetch(url, options).then((response) => response.json().then((data) => [response.status, data]))
            .catch((error) => [error, null]);
    };


    makeGetRequest = async (url) => {
        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Origin': 'http://89.208.198.137:8081/',
            },
        };
        return this.makeRequest(`${baseURL}:${port}/${url}`, options);
    }

    makePostRequest = async (url, data) => {
        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Origin': 'http://89.208.198.137:8081/',
            },
            body: JSON.stringify(data),
        };
        // console.log(`${baseURL}:${port}/${url}`);
        return this.makeRequest(`${baseURL}:${port}/${url}`, options);
    }

    makeDeleteRequest = async (url) => {
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Origin': 'http://89.208.198.137:8081/',
            },
        };
        return this.makeRequest(`${baseURL}:${port}/${url}`, options);
    }
}
