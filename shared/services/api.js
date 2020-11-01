import axios from 'axios';

const BASE_URL = 'http://teleorgapi.azurewebsites.net/api/'

export function getOrgaos(token) {
    return axios.get(`${BASE_URL}entrega/findAll`, {
        headers: {
            Authorization: token
        }
    }).then(({data})=> data).catch((e)=> e);
}

export function realizarLogin(body) {
    return axios.post(`${BASE_URL}usuarios/auth`, body).then(({data})=> data).catch(e => e);
}
