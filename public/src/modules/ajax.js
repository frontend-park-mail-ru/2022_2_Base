export default class Req {
    #baseURL = 'http://89.208.198.137';
    #port = 8080;

    constructor() {
    }

    makeRequest = (url, options) => {
        return fetch(url, options).then((response) => response.ok  ? response.json().then((data) => [response.status, data]) : [response.status, response.body])
            .catch((error) => [500, error]);
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
        return this.makeRequest(`${this.#baseURL}:${this.#port}/${url}`, options);
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
        // console.log(`${this.#baseURL}:${this.#port}/${url}`);
        return this.makeRequest(`${this.#baseURL}:${this.#port}/${url}`, options);
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
        return this.makeRequest(`${this.#baseURL}:${this.#port}/${url}`, options);
    }
}
