import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { Linking, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import { TabBarIconMenu, TabBarIconMenuEvent, AlertIconMenu } from './TabBarIcon';
import { MaterialIcons } from '@expo/vector-icons';
import { withFirebaseHOC } from '../config/Firebase';

const CustomDrawerContent = (props) => {
    const { firebase } = props
    const [loading, setLoading] = React.useState()

    const translateX = Animated.interpolate(props.progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });
    const [userNick, setUserNick] = React.useState('Marcelo')
    const [userEmail, setUserEmail] = React.useState()

    React.useEffect(() => {
        const { user } = firebase
        if (user.email && !userEmail) {
            setUserNick(firebase.user.nickname)
            setUserEmail(firebase.user.email)
        }
    }, [props])

    const handleLogout = _ => {
        AsyncStorage.clear()
        firebase.setToken(null)
    }

    return (
        <Animated.View style={[{ transform: [{ translateX }] }, styles.container]}
            {...props}>
            <View style={[styles.containHeader, { backgroundColor: '#e91e63' }]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
                    <Text style={{ color: '#f9f9f9', marginTop: '3%' }}>{`${userNick}`}</Text>
                    <Text style={{ color: '#f9f9f9' }}>{userEmail}</Text>
                </View>
            </View>

            <DrawerItem
                label="FEED"
                icon={({ focused }) => <TabBarIconMenu focused={focused} name="md-home" />}
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
                label="EVENTOS"
                icon={({ focused }) => <TabBarIconMenuEvent focused={focused} name="event" />}
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
                label="ALERTAS"
                icon={({ focused }) => <AlertIconMenu focused={focused} name="md-book" />}
                onPress={() => props.navigation.navigate('Alerta')}
            />
            <DrawerItem
                label="PERFIL"
                icon={({ focused }) => <TabBarIconMenu focused={focused} size={28} margin={3} name="md-person" />}
                onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
                label="CONFIGURAÇÕES"
                icon={({ focused }) => <TabBarIconMenu focused={focused} margin={3} name="ios-settings" />}
                onPress={() => props.navigation.navigate('Home')}
            />
            {/* <DrawerItemList {...props} style={{backgroundColor: 'black'}} /> */}
            <View>
                <View style={{ marginTop: '5%' }}>
                    <Divider style={{ backgroundColor: '#777f7c90' }} />
                </View>
            </View>

            <DrawerItem
                label="Sair"
                onPress={handleLogout}
                icon={({ focused }) => <TabBarIconMenu focused={focused} name="ios-power" />}
                style={styles.closeBtn}
            />
        </Animated.View>
    );
}

export default withFirebaseHOC(CustomDrawerContent)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containHeader: {
        paddingTop: '4%',
        paddingBottom: '4%'
    },
    containDrawerOption: {
        paddingLeft: '6%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '1%',
        paddingBottom: '5%',
        backgroundColor: '#e6e6e6',
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontWeight: '600',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50
    },
    actionText: {
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontWeight: '600',
        marginRight: '3%',
        marginLeft: '3%',
    },
    closeBtn: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-end',
        flex: 1
    },
    closeText: {
        fontFamily: 'sans-serif-medium',
        fontWeight: '600',
        marginRight: '3%',
        marginLeft: '3%',
    }
});