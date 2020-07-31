import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import gatao from '../assets/images/gatao.jpeg'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import { ProfileRoundImg } from '../components/CustomElements'


const ProfileInfo = props => {

    return (
        <View style={styles.userInfo}>
            <Text>Marcelo Rei</Text>
            <Text>@marretinha.mil_gr$au</Text>
        </View>
    )
}

export default ProfileImage = props => {
    const { firebase } = props
    const [image, setImage] = React.useState(null);
    const [_state, setState] = React.useState({})
    React.useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    React.useEffect(() => {
        if (_state.progress === 100) {
            setTimeout(() => {
                setState({
                    ..._state,
                    progress: 0
                })
            }, 2000)
        }
    }, [_state])

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });

            const ext = result.uri.split('.').pop(); // Extract image extension
            const response = await fetch(result.uri);
            const blob = await response.blob();
            firebase.FIREBASE.storage().ref().child('UIDSDASDAKN1231.' + ext).put(blob)
                .on(
                    firebase.FIREBASE.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        let state = {};
                        state = {
                            ...state,
                            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                        };
                        if (snapshot.state === firebase.FIREBASE.storage.TaskState.SUCCESS) {
                            const allImages = _state.images;
                            allImages.push(snapshot.downloadURL);
                            state = {
                                ...state,
                                uploading: false,
                                imgSource: '',
                                imageUri: '',
                                progress: 0,
                                images: allImages
                            };
                            // AsyncStorage.setItem('images', JSON.stringify(allImages));
                        }
                        setState(state);
                    },
                    error => {
                        unsubscribe();
                        alert('Sorry, Try again.');
                    }
                );

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <View style={{ justifyContent: 'center' }}>
            <View style={styles.ProfilePhotoContainer}>
                <View>
                    <Avatar
                        size={110}
                        rounded
                        source={image ? { uri: image } : gatao}
                        icon={{ type: 'Feather', name: 'camera', size: 24, color: 'black' }}
                        accessory={{ type: 'feather', name: 'camera', size: 24, color: '#9597A1', style: styles.Icon }}
                        showAccessory={true}
                        ImageComponent={ProfileRoundImg}
                        onPress={_ => console.log('clicked')}
                        onAccessoryPress={pickImage}
                    />
                </View>
                <ProfileInfo />

            </View>
            <View
                style={[styles.progressBar, { width: `${_state.progress || 0}%` }]}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    ProfilePhotoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Icon: {
        backgroundColor: '#e4e7ff',
        borderRadius: 100,
        width: 35,
        height: 34,
        justifyContent: 'center'
    },
    userInfo: {
        marginLeft: 25
    },
    progressBar: {
        backgroundColor: 'rgb(3, 154, 229)',
        height: 3,
        shadowColor: '#000',
    }
})