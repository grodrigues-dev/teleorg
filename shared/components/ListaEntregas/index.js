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
            registrosPorPagina: 5,
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
        console.log(this.state.status);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.entregaContainer, { backgroundColor: this.state.status.background }]}>
                    <Text>Status: {this.state.status.status}</Text>
                    <Text>Previsão de entrega: {this.getPrevisao(this.state.entrega.previsaoEntrega)}</Text>
                    <Text>Tempo Estimado</Text>
                </View>
                <View style={styles.containerPaginacao}>
                    <TouchableOpacity
                        style={this.state.registroAtual === 0 ? styles.botoesPaginacaoDisabled : styles.botoesPaginacao}
                        disabled={this.state.registroAtual === 0}
                        onPress={() => this.navegarEntreRegistros(-1)}>
                        <Text style={styles.textoBotesPaginacao}>Anterior</Text>
                    </TouchableOpacity>
                    <Text>Pg. {this.state.paginaBusca}</Text>
                    <TouchableOpacity
                        onPress={() => this.navegarEntreRegistros(1)}
                        style={this.state.registroAtual === 4 ? styles.botoesPaginacaoDisabled : styles.botoesPaginacao}
                        disabled={this.state.registroAtual === 4}>
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
        marginTop: 20,
        marginBottom: 20
    },
    entregaContainer: {
        marginTop: 10,
        padding: 10,
    },
    containerPaginacao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 50,

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
