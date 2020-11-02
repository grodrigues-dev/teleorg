import React, { Component } from 'react';
import Header from '../shared/components/Header';
import Loader from '../shared/components/Loader';
import ListaEntregas from '../shared/components/ListaEntregas';

import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { getOrgaos, getEntregaPorId } from '../shared/services/api';

import { getPrevisao, getStatus } from '../shared/util';


const token = AsyncStorage.getItem('token')

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaEntregas: [],
            loading: true,
            showModalFindOne: false,
            idEntrega: '',
            entrega: {},
            status: {

            }
        }

    }

    componentDidMount() {
        getOrgaos(token['_W']).then((data) => {
            this.setState({
                listaEntregas: data,
                loading: false
            });
        }).catch(() => {
            this.setState({
                loading: false
            });
            alert('Erro ao consultar as entregas')
        })
    }

    closeModal = () => {
        this.setState({
            showModalFindOne: false
        })
    }

    consultarEntrega = () => {
        this.setState({ loading: true });
        getEntregaPorId(token['_W'], this.state.idEntrega).then(data => {
            if (!data.id) {
                this.setState({ loading: false })
                return alert('entrega nao encontrada');
            }
            this.setState({
                loading: false,
                entrega: data,
                showModalFindOne: true,
                status: getStatus(data.statusEntrega)
            });
        }).catch(() => {
            this.setState({
                loading: false
            });
            alert('Erro ao consulta entregas')
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.pesquisaContainer}>
                    <View style={styles.pesquisa}>
                        <Text style={styles.textoPesquisa}>
                            Digite o código de {"\n"} rastreamento
                        </Text>
                        <View style={styles.containerInput}>
                            <View style={styles.backgroundInput}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={e => this.setState({ idEntrega: e })}
                                    keyboardType={'numeric'}
                                    placeholder="DIGTE O ID DA ENTREGA"
                                />
                                <TouchableHighlight
                                    disabled={!this.state.idEntrega}
                                    onPress={this.consultarEntrega}>
                                    <Image style={styles.icon} source={require('../assets/lupa.png')} />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.linha} />
                        <View style={styles.containerOrgaos}>
                            <Image style={styles.iconOrgaos} source={require('../assets/rim.png')} />
                            <Image style={styles.iconOrgaos} source={require('../assets/pulmao.png')} />
                            <Image style={styles.iconOrgaos} source={require('../assets/coracao.png')} />
                            <Image style={styles.iconOrgaos} source={require('../assets/figado.png')} />
                        </View>
                    </View>
                    <View style={styles.containerBotoes}>
                        <TouchableHighlight
                            style={styles.btnFiltro}>
                            <React.Fragment>
                                <Text style={styles.textoBotao}>Filtro</Text>
                                <Image style={styles.icoBotao} source={require('../assets/filtro.png')} />
                            </React.Fragment>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.btnOrdenar}>
                            <React.Fragment>
                                <Text style={styles.textoBotao}>Ordenar</Text>
                                <Image style={styles.icoBotao} source={require('../assets/ordenar.png')} />
                            </React.Fragment>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.containerMain}>
                    {
                        !this.state.loading &&
                        <ListaEntregas
                            entrega={this.state.listaEntregas}
                        />
                    }
                </View>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={this.state.showModalFindOne}>
                    <View style={styles.modalBackground}>
                        <View style={[styles.modalContainer, { backgroundColor: this.state.status.background }]}>
                            <TouchableHighlight
                                onPress={this.closeModal}
                                style={{ marginBottom: 20 }}>
                                <Image style={styles.icoClose} source={require('../assets/closemodal.png')} />
                            </TouchableHighlight>
                            <View>
                                {
                                    (this.state.entrega.statusEntrega === 'EM_PREPARACAO' || this.state.entrega.statusEntrega === 'EM_ROTA') &&
                                    <View style={[styles.entregaContainer]}>
                                        <Text>cod. entrega: {this.state.entrega.id}</Text>
                                        <Text>Status: {this.state.status.status}</Text>
                                        <Text>Orgão solicitado: {this.state.entrega.doacao.orgao.tipoOrgao}</Text>
                                        <Text>Previsão de entrega: {getPrevisao(this.state.entrega.previsaoEntrega)}</Text>
                                        <Text>Paciente Destinatário: {this.state.entrega.doacao.receptor.nome}</Text>
                                        <Text>Endereço de entrega: {
                                            `${this.state.entrega.doacao.orgao.doador.hospital.nome} ${this.state.entrega.doacao.orgao.doador.hospital.logradouro} ${this.state.entrega.doacao.orgao.doador.hospital.cidade}`}</Text>
                                        <Text>Endereço de destino: {
                                            `${this.state.entrega.doacao.receptor.hospital.nome} ${this.state.entrega.doacao.receptor.hospital.logradouro} ${this.state.entrega.doacao.receptor.hospital.cidade}`} </Text>
                                    </View>
                                }
                                {
                                    this.state.entrega.statusEntrega === 'CANCELADO' &&
                                    <View style={[styles.entregaContainer]}>
                                        <Text>cod. entrega: {this.state.entrega.id}</Text>
                                        <Text>Status: {this.state.status.status}</Text>
                                        <Text>A entrega solcitada foi cancelada, em breve uma nova entrega será gerada para o endereço solicitado</Text>
                                    </View>
                                }
                                {
                                    this.state.entrega.statusEntrega === 'ENTREGUE' &&
                                    <View style={[styles.entregaContainer]}>
                                        <Text>cod. entrega: {this.state.entrega.id}</Text>
                                        <Text>Orgão solicitado: {this.state.entrega.doacao.orgao.tipoOrgao}</Text>
                                        <Text>Status: {this.state.status.status}</Text>
                                        <Text>A entrega foi realizada com sucesso!</Text>
                                        <Text>Nome do paciente: {this.state.entrega.doacao.receptor.nome}</Text>
                                        <Text>Data entrega: {getPrevisao(this.state.entrega.dataHoraEntrega)}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
                <Loader showModal={this.state.loading} />

            </View>
        )
    }

}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF5F5'
    },
    pesquisaContainer: {
        alignItems: "center",
        backgroundColor: '#1538A1',
        padding: 20,
        height: 150,
    },
    containerMain: {
        marginTop: 200,
        padding: 20
    },
    pesquisa: {
        backgroundColor: '#fff',
        width: 380,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center'
    },
    textoPesquisa: {
        color: '#1538A1',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },
    containerInput: {
        backgroundColor: '#C91D14',
        height: 70,
        width: 300,
        marginTop: 20,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    },
    backgroundInput: {
        backgroundColor: '#fff',
        width: 280,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 5
    },
    icon: {
        width: 35,
        height: 35
    },
    iconOrgaos: {
        width: 60,
        height: 60
    },
    textInput: {
        width: 230,
    },
    linha: {
        width: 300,
        height: 2,
        backgroundColor: '#000',
        marginTop: 20,
        marginBottom: 20
    },
    containerOrgaos: {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        justifyContent: "space-between"
    },
    containerBotoes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 380,
        marginTop: 20,
        height: 50
    },
    btnFiltro: {
        backgroundColor: '#F79114',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        width: 160,
        borderRadius: 40
    },
    btnOrdenar: {
        backgroundColor: '#21A115',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        width: 160,
        borderRadius: 40
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    icoBotao: {
        width: 25,
        height: 20
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000090'
    },
    modalContainer: {
        height: 250,
        width: 350,
        borderRadius: 10,
        padding: 20
    },
    icoClose: {
        width: 15,
        height: 15
    },
})

