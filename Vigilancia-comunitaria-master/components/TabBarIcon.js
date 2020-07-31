import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}


export function TabBarIconMenu(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.size || 30}
      style={{ marginBottom: -3, paddingLeft: props.margin, marginRight: -15 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

export function TabBarIconMenuEvent(props) {
  return (
    <MaterialIcons
      name={props.name}
      size={props.size || 25}
      style={{ marginBottom: -3, marginRight: -15 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} />
  )
}


export function AlertIcon(props) {
  return (
    <MaterialCommunityIcons
      name="bell-ring-outline"
      size={28}
      color={props.focused ? Colors.tabIconSelected : 'white'}
    />
  )
}

export function AlertIconMenu(props) {
  return (
    <MaterialCommunityIcons
      name="bell-alert-outline"
      size={27}
      style={{ marginBottom: -3, marginRight: -16 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} />
  )
}

