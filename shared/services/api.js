import axios from 'axios';

const BASE_URL = 'http://teleorgapi.azurewebsites.net/api/'

export function getOrgaos(page){
    return axios.get(`${BASE_URL}entrega/${page}`).then(({data})=> data.content).catch((e)=> e);
}