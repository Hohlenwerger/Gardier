import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/logo-icon.png'

const Topbar = props => {

    const handleToggle = e => {
        try {
            props.navigation.toggleDrawer()
        } catch (e) {
            Alert.alert('Você precisa estar logado para acessar todas as funções')
        }
    }

    const handleRefresh = _ => {
        if (props.handleRefresh)
            props.handleRefresh()
    }

    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={handleToggle}>
                <Ionicons name="md-menu" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRefresh}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <Ionicons name="md-help-circle-outline" size={24} color="white" />
        </View>
    )
}

export default Topbar;

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'cover',
        width: 55,
        height: 52,
    },
    container: {
        alignSelf: 'stretch',
        position: 'relative',
        width: '100%',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: '#A53DB5',
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 7
    }
});
