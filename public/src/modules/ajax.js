const noop = () => {
};

const baseURL = 'http://89.208.198.137';
const port = 8080;

export default class Req {

    constructor() {
    }

    makeRequest = (url, options) => {
        const f = fetch(url, options);
        console.log(f);
        return f.then((response) => response.json().then((data) => [response.status, data]));
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

    // makeDRequest = (url, options) => {
    //     const f = fetch(url, options);
    //     console.log(f);
    //     return f.then((response) => {
    //         console.log(response);
    //         response.then(() => response.status)
    //     });
    // };

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
