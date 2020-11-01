import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import moment from 'moment';


export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaEntregas: this.props.entrega,
            entrega: this.props.entrega[0],
            registroAtual: 0,
            registrosPorPagina: this.props.entrega.length,
            status: this.getStatus(this.props.entrega[0].statusEntrega)
        }
    }

    getPrevisao = (data) => {
        return moment(data).format('DD/MM/YYYY hh:mm');
    }

    getStatus = (entrega) => {
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


    navegarEntreRegistros = (direcao) => {
        const proximoRegistro = this.state.registroAtual + direcao;
        this.setState({
            entrega: this.state.listaEntregas[proximoRegistro],
            registroAtual: proximoRegistro
        });
        this.setState({
            status: this.getStatus(this.state.listaEntregas[proximoRegistro].statusEntrega)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    (this.state.entrega.statusEntrega === 'EM_PREPARACAO' || this.state.entrega.statusEntrega === 'EM_ROTA') &&
                    <View style={[styles.entregaContainer, { backgroundColor: this.state.status.background }]}>
                        <Text>cod. entrega: {this.state.entrega.id}</Text>
                        <Text>Status: {this.state.status.status}</Text>
                        <Text>Orgão solicitado: {this.state.entrega.doacao.orgao.tipoOrgao}</Text>
                        <Text>Previsão de entrega: {this.getPrevisao(this.state.entrega.previsaoEntrega)}</Text>
                        <Text>Paciente Destinatário: {this.state.entrega.doacao.receptor.nome}</Text>
                        <Text>Endereço de entrega: {
                            `${this.state.entrega.doacao.orgao.doador.hospital.nome} ${this.state.entrega.doacao.orgao.doador.hospital.logradouro} ${this.state.entrega.doacao.orgao.doador.hospital.cidade}`}</Text>
                        <Text>Endereço de destino: {
                            `${this.state.entrega.doacao.receptor.hospital.nome} ${this.state.entrega.doacao.receptor.hospital.logradouro} ${this.state.entrega.doacao.receptor.hospital.cidade}`} </Text>
                    </View>
                }
                {
                    this.state.entrega.statusEntrega === 'CANCELADO' &&
                    <View style={[styles.entregaContainer, { backgroundColor: this.state.status.background }]}>
                        <Text>cod. entrega: {this.state.entrega.id}</Text>
                        <Text>Status: {this.state.status.status}</Text>
                        <Text>A entrega solcitada foi cancelada, em breve uma nova entrega será gerada para o endereço solicitado</Text>
                    </View>
                }
                {
                    this.state.entrega.statusEntrega === 'ENTREGUE' &&
                    <View style={[styles.entregaContainer, { backgroundColor: this.state.status.background }]}>
                        <Text>cod. entrega: {this.state.entrega.id}</Text>
                        <Text>Orgão solicitado: {this.state.entrega.doacao.orgao.tipoOrgao}</Text>
                        <Text>Status: {this.state.status.status}</Text>
                        <Text>A entrega foi realizada com sucesso!</Text>
                        <Text>Nome do paciente: {this.state.entrega.doacao.receptor.nome}</Text>
                        <Text>Data entrega: {this.getPrevisao(this.state.entrega.dataHoraEntrega)}</Text>
                    </View>
                }
                <View style={styles.containerPaginacao}>
                    <TouchableOpacity
                        style={this.state.registroAtual === 0 ? styles.botoesPaginacaoDisabled : styles.botoesPaginacao}
                        disabled={this.state.registroAtual === 0}
                        onPress={() => this.navegarEntreRegistros(-1)}>
                        <Text style={styles.textoBotesPaginacao}>Anterior</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.navegarEntreRegistros(1)}
                        style={this.state.registroAtual === this.state.listaEntregas.length -1 ? styles.botoesPaginacaoDisabled : styles.botoesPaginacao }
                        disabled={this.state.registroAtual === this.state.listaEntregas.length -1 }
                        >
                        <Text
                            style={styles.textoBotesPaginacao}>Próxima</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10
    },
    entregaContainer: {
        marginTop: 10,
        padding: 10,
        height: 180,
        borderRadius: 10,
        justifyContent: 'center'
    },
    containerPaginacao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,

    },
    botoesPaginacao: {
        backgroundColor: '#C91D14',
        height: 30,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botoesPaginacaoDisabled: {
        backgroundColor: '#d96762',
        height: 30,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoBotesPaginacao: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 'bold'
    }
})
