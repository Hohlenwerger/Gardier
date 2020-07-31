import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon, {TabBarIconMenuEvent} from '../components/TabBarIcon';
import { AlertIcon } from '../components/TabBarIcon'
import LinksScreen from '../screens/LinksScreen';
import FeedScreen from '../screens/FeedScreen';
import { View, Text, TouchableOpacity, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import AlertNavigation from './AlertNavigation';
import TabBar from '../components/BottomTabBar'
import ProfileScreen from '../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: 'horizontal'
  });
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#F8F8F8',
        inactiveTintColor: '#586589',
        style: {
          backgroundColor: '#8e2e9c'
        },
        tabStyle: {},
        mode: 'modal',
      }}
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators
          .forModalPresentationIOS
      }}
      animation="fade"
      headerMode="float"
    >
      <BottomTab.Screen
        name="Home"
        component={FeedScreen}
        options={{
          title: 'Feed',
          gestureEnabled: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          animationEnabled: true,
          animationTypeForReplace: 'pop'
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'livrinho',
          gestureEnabled: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="Alerta"
        component={AlertNavigation}
        options={{
          title: 'alerta',
          gestureEnabled: true,
          tabBarVisible: false,
          outer: true,
          tabBarIcon: ({ focused }) => <AlertIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Eventos"
        component={LinksScreen}
        options={{
          title: 'livrinho',
          gestureEnabled: true,
          tabBarIcon: ({ focused }) => <TabBarIconMenuEvent focused={focused} size={27} name="event" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Login',
          gestureEnabled: true,
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => <FontAwesome name="user-o" size={24} color="#ccc" />,
        }}
      />
    </BottomTab.Navigator>

  );
}

const styles = {
  bottom: {
    backgroundColor: 'pink'
  },
  menu: {
    backgroundColor: 'purple',
    borderWidth: 1
  },
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  return routeName
  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
    case 'Login':
      return 'Links to learn more';
  }
}
