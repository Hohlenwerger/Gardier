import * as React from 'react';
import { TabBarIconMenu } from '../components/TabBarIcon';

import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from '../components/CustomDrawerContentComponent'
import { withFirebaseHOC } from '../config/Firebase';
// import { CustomDrawerContent } from '../components/CustomDrawerContentComponent'
const Drawer = createDrawerNavigator()
const DrawerNavigator = ({firebase, ...props}) => {
    const INITIAL_ROUTE_NAME = 'botton'
    props.navigation.setOptions({
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal'
    })

    React.useEffect(_ => {
        try {
            firebase
                .FIREBASE
                .firestore()
                .collection("USER")
                .doc(firebase.token)
                .get().then(function (doc) {
                    if (doc.exists) {
                        let userDoc = doc.data()
                        firebase.setUser(userDoc)
                    } else {
                        // * error / not found *
                    }
                })
        } catch (e) {
            console.log('erro')
        }

    }, [])
    return (
        <Drawer.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: '#F8F8F8',
                inactiveTintColor: '#586589',
                style: {
                    backgroundColor: '#8e2e9c'
                },
                tabStyle: {},
            }}
            drawerContent={CustomDrawerContent}
            drawerStyle={{
                width: 260,
            }}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
            }}
            hideStatusBar={false}
        >
            <Drawer.Screen
                name="botton"
                component={BottomTabNavigator}
                options={{
                    drawerIcon: ({ focused }) => <TabBarIconMenu focused={focused} name="md-book" />,
                }}

            />
        </Drawer.Navigator>
    )
}

export default withFirebaseHOC(DrawerNavigator)