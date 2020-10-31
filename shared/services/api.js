import axios from 'axios';

const BASE_URL = 'http://teleorgapi.azurewebsites.net/api/'

export function getOrgaos(page, token) {
    return axios.get(`${BASE_URL}entrega/${page}`, {
        headers: {
            Authorization: token
        }
    }).then(({data})=> data.content).catch((e)=> e);
}

export function realizarLogin(body) {
    return axios.post(`${BASE_URL}usuarios/auth`, body).then(({data})=> data).catch(e => e);
}
