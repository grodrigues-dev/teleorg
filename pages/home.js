import React, { Component } from 'react';
import Header from '../shared/components/Header';

import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';

import { getOrgaos } from '../shared/services/api';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaOrgaos: []
        }
    }

    componentDidMount() {
        getOrgaos().then((data) => {
            this.setState({
                listaOrgaos: data
            });
        }
        ).catch((e) => {
            console.log(e);
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
                                    style={styles.textInput} />
                                <Image style={styles.icon} source={require('../assets/lupa.png')} />
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
                        <TouchableHighlight style={styles.btnFiltro}>
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
    pesquisa: {
        backgroundColor: '#fff',
        height: 290,
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
    }
})

