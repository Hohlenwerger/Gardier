import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'

const MyTabBar = ({ state, descriptors, navigation, ...tabBarOptions }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const OuterButton = props => {
                    return (
                        <TouchableOpacity
                            key={route.name}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            opacity={0}
                            activeOpacity={0.9}
                            onLongPress={onLongPress}
                            style={[{ flex: 1, paddingVertical: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', position: 'relative' }, tabBarOptions.style]}
                        >
                            <View style={styles.ViewOuterBox}>
                                <View style={styles.OuterContainer}>
                                    <options.tabBarIcon focused={isFocused}/>
                                </View>
                                <View style={styles.ViewOuterCircle}></View>

                                {tabBarOptions.showLabel &&
                                    <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                        {label}
                                    </Text>}
                            </View>
                        </TouchableOpacity>
                    )
                }

                return options.outer ?
                    <OuterButton key={route.name}/> :
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        opacity={0}
                        activeOpacity={0.9}
                        onLongPress={onLongPress}
                        style={[{ flex: 1, paddingVertical: 7, alignItems: 'center', justifyContent: 'center' }, tabBarOptions.style]}
                    >
                        <options.tabBarIcon focused={isFocused} />
                        {
                            tabBarOptions.showLabel &&
                            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                {label}
                            </Text>
                        }
                    </TouchableOpacity>
            })}
        </View >
    );
}

const styles = StyleSheet.create({
    ViewOuterBox: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    ViewOuterCircle: {
        backgroundColor: 'white',
        borderRadius: 9,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        marginLeft: -5,
        width: 56,
        height: 32,
        marginTop: -9, 
        alignSelf: 'center',
        justifyContent: 'center'
    },
    OuterContainer: {
        zIndex: 2,
        backgroundColor: '#ff4293',
        borderRadius: 100,
        padding: 8,
        position: 'absolute',
        top: -25,
        left: '18.8%'
    }
})



export default MyTabBar