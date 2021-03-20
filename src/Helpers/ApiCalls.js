import axios from "axios";
import { getToken } from "./Token";

export class ApiCalls {
    apiUrl = process.env.API_ENDPOINT || 'https://radiance-api.herokuapp.com/api';
    authCall(endpoint, body) {
        return new Promise((res, rej) => {
            axios.post(`${this.apiUrl}/user/${endpoint}`, JSON.stringify(body), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.data.status > 400) {
                    rej(response.data)
                }
                res(response.data);
            }, err => {
                rej(err);
            }).catch(error => rej(error));
        })
    }

    getCall(endpoint) {
        return new Promise((res, rej) => {
            axios.get(`${this.apiUrl}/${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(response => {
                if (response.data.status > 400) {
                    rej(response.data)
                }
                res(response.data);
            }, err => {
                rej(err)
            }).catch(error => rej(error))
        })
    }

    postCall(endpoint, body) {
        return new Promise((res, rej) => {
            axios.post(`${this.apiUrl}/${endpoint}`, JSON.stringify(body), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(response => {
                if (response.data.status > 400) {
                    rej(response.data)
                }
                res(response.data);
            }, err => {
                rej(err)
            }).catch(error => rej(error))
        })
    }

    putCall(endpoint, body) {
        return new Promise((res, rej) => {
            axios.put(`${this.apiUrl}/${endpoint}`, JSON.stringify(body), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            }).then(response => {
                if (response.data.status > 400) {
                    rej(response.data)
                }
                res(response.data);
            }, err => {
                rej(err)
            }).catch(error => rej(error))
        })
    }
}