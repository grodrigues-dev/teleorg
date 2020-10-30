import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
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
                <Text>teleorg</Text>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#1538A1',
        padding: 20,
        marginTop: 100
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 5,
        width: 288,
        padding: 10,
        fontSize: 20
    },
    button: {
        borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 25,
        width: 188,
        textAlign: "center",
        padding: 6,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    link: {
        color: "#fff",
        fontSize: 18,
        textDecorationLine: "underline",
        paddingTop: 15
    }
})

