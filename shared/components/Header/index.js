import React from 'react'
import {
    Image,
    StyleSheet,
    View
} from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={require('../../../assets/logo.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: '#1538A1',
        height: 25,
        paddingTop: 5,
        width: '100%',
        justifyContent: 'center'
    },
    logo: {
        height: 20,
        width: 120
    }
})

