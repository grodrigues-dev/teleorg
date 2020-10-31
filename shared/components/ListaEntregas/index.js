import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import moment from 'moment';


export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusEntrega: '', 
            previsaoEntrega: ''
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.setState(this.props.entrega)
    }

    getPrevisao = (data) => {
        return moment(data).format('DD/MM/YYYY hh:mm');
    }

    getPrazo = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.entregaContainer}>
                    <Text>Status: {this.state.statusEntrega}</Text>
                    <Text>Previsão de entrega: {this.getPrevisao(this.state.previsaoEntrega)}</Text>
                    <Text>Tempo Estimado</Text>
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
    }
})
