import moment from 'moment';

export const getPrevisao = (data) => {
    return moment(data).format('DD/MM/YYYY hh:mm');
}

export const getStatus = (entrega) => {
    let status;
    switch (entrega) {
        case 'EM_PREPARACAO':
            status = {
                status: 'Em preparação',
                background: '#DCE1F2'
            }
            break;
        case 'EM_ROTA':
            status = {
                status: 'Em rota',
                background: '#FFF080'
            }
            break;
        case 'ENTREGUE':
            status = {
                status: 'Entregue',
                background: '#E7F5E6'
            }
            break;
        case 'CANCELADO':
            status = {
                status: 'Cancelado',
                background: '#E8C7C5'
            }
            break;
    }
    return status;
}