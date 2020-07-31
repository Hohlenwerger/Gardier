import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'

export default ProfileFormData = ({ listLabel }) => {
    const [list, setList] = React.useState([
        {
            title: 'Email',
            icon: {
                name: 'mail',
                type: 'feather'
            }
        },
        {
            title: 'Celular',
            icon: {
                name: 'smartphone',
                type: 'feather'
            }
        },
        {
            title: 'CEP',
            icon: {
                name: 'location',
                type: 'entypo'
            }
        },
        {
            title: 'Localização',
            icon: {
                name: 'map',
                type: 'entypo'
            }
        },
        {
            title: 'Bairro',
            icon: {
                name: 'location-city',
                type: 'material-icons'
            }
        },
        {
            title: 'Endereço',
            icon: {
                name: 'address',
                type: 'entypo'
            }
        },
    ]);
    const [load, setLoad] = React.useState(false)

    React.useEffect(_ => {
        const list_ = list.map((v, idx) => ({
            title: v.title,
            icon: v.icon,
            right: listLabel[idx]
        })
        )
        setList(list_)
    }, [load])

    return (
        <View>
            {
                list.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        leftIcon={item.icon}
                        rightTitle={item.right || 'teste'}
                        chevron
                        rightContentContainerStyle={styles.rightContentContainer}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    rightContentContainer: {
        // borderWidth: 1,
        flex: 1.9,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'

    }
})