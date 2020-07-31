import * as React from 'react';
import { TransitionPresets, CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {AlertScreen, Alert1, Alert2} from '../screens/AlertScreen';
const AlertStack = createStackNavigator()

const AlertNavigator = ({ navigation, route }) => {
  const INITIAL_ROUTE_NAME = 'Alert-1'
  return (
    <AlertStack.Navigator
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
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators
          .forHorizontalIOS
      }}
      animation="fade"
      headerMode="float"
    >
      <AlertStack.Screen
        name="Alert-1"
        component={Alert1}
      />
      <AlertStack.Screen
        name="Alert-2"
        component={Alert2}
      />
      <AlertStack.Screen
        name="Alert-3"
        component={Alert1}
      />
    </AlertStack.Navigator>
  )
}

export default AlertNavigator