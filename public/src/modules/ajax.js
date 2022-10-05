const noop = () => {
};

const baseURL = 'http://89.208.198.137';
const port = 8080;

export default class Req {

    constructor() {
    }

    makeRequest = (url, options) => {
        console.log(fetch(url, options));
        //return fetch(url, options).then((response) => console.log(response));
       // return fetch(url, options).then((response) => response.json().then((data) => [response.status, data]));

        return fetch('http://89.208.198.137:8080/api/v1/', {
            method: 'GET', // or 'PUT'
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
           // body: JSON.stringify({password: "password", username: "username"}),
        })
            .then((response) => console.log(response));

        // return fetch('http://89.208.198.137:8080/api/v1/login', {
        //     method: 'POST', // or 'PUT'
        //     mode: 'no-cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Origin': 'http://89.208.198.137/',
        //         'accept': 'application/json',
        //     },
        //     body: JSON.stringify({password: "password", username: "username"}),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        //return fetch(url, options).then((response) => response.json().then((data) => console.log(data)));
    };


    makeGetRequest = async (url, data) => {
        const options = {
            method: 'get',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://89.208.198.137/',
                //'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        };
        console.log(`${baseURL}:${port}/${url}`);
        return this.makeRequest(`${baseURL}:${port}/${url}`, options);
    }

    makePostRequest = async (url, data) => {
        const options = {
            method: 'post',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Origin': 'http://89.208.198.137/',
                //'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        };
        console.log(`${baseURL}:${port}/${url}`);
        return this.makeRequest(`${baseURL}:${port}/${url}`, options);
    }
}