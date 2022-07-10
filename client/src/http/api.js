import axios from 'axios';

const apiAddress = process.env.REACT_APP_API_ADDRESS || 'http://localhost:5000';

export class API {
    GetMailbox(from = 0, to = 20) {
        return new Promise((resolve) => {
            axios.get(`${apiAddress}/mailbox?from=${from}&to=${to}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    resolve(error);
                });
        })
    }

    MarkRead(messageId = 0) {
        return new Promise((resolve) => {
            axios.post(`${apiAddress}/mailbox/read/${messageId}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    resolve(error);
                });
        })
    }

    SetFlag(messageId = 0) {
        return new Promise((resolve) => {
            axios.post(`${apiAddress}/mailbox/flag/${messageId}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    resolve(error);
                });
        })
    }
}

export const api = new API();
