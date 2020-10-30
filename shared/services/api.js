import axios from 'axios';

const BASE_URL = 'http://teleorgapi.azurewebsites.net/api/'

export function getOrgaos(){
    return axios.get(`${BASE_URL}orgao`).then(({data})=> data).catch((e)=> e);
}