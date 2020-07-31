import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Alert
} from 'react-native';
import Topbar from '../components/topbar';
import { withFirebaseHOC } from "../config/Firebase";
import { Ionicons, SimpleLineIcons, Entypo, MaterialCommunityIcons, MaterialIcons,Feather  } from '@expo/vector-icons';
import ProfileUserImage from '../components/ProfileUserImage';
import ProfileFormData from '../components/ProfileFormData';
import { TextInput } from 'react-native-gesture-handler';

const PreviousPage = ({ navigation, title }) => (
    <View style={styles.PreviousPage}>
        <TouchableOpacity onPress={_ => navigation.goBack()} style={styles.ButtonBox}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            <Text style={styles.Title}>{title}</Text>
        </TouchableOpacity>
    </View>
)
//<SimpleLineIcons name="logout" size={24} color="white" />
//<ProfileFormData listLabel={parseUserData} />
const ProfileScreen = ({ navigation, firebase, userData }) => {
    const [parseUserData, setParseUserData] = React.useState([
        firebase.user.email,
        firebase.user.phone,
        firebase.user.cep,
        firebase.user.city + '-' + firebase.user.uf,
        firebase.user.neightborhood,
        firebase.user.street + ' nº ' + firebase.user.number
    ])

    
    
    
    //states usados para Update
    const [email, setEmail] = React.useState(firebase.user.email);
    const [phone, setPhone] = React.useState(firebase.user.phone);
    const [cep, setCep] = React.useState(firebase.user.cep);
    const [city, setCity] = React.useState(firebase.user.city);
    const [uf, setUf] = React.useState(firebase.user.uf);
    const [street, setStreet] = React.useState(firebase.user.street);
    const [neightborhood, setNeightborhood] = React.useState(firebase.user.neightborhood);
    const [numberHome, setNumberHome] = React.useState(firebase.user.number.toString());
    
    const update = async _ => {
        try {
            var updateOption = firebase.FIREBASE
              .firestore()
              .collection("USER")
              .doc(firebase.token)
              
              Alert.alert(
                "Perfil Salvo!",
                "Os dados inseridos foram salvos",
                [
                    {
                        text: "OK"
                    },
                ],
                { cancelable: false }
            );
            
            return updateOption.update({
                cep: cep,
                city: city,
                number: numberHome,
                phone: phone,
                street: street,
                uf: uf ,
                updated_at: new Date(),
            })
              
        } 
        catch (e) {
            Alert.alert(
                "Erro ao salvar perfil!",
                e.message,
                [
                    {
                        text: "OK"
                    },
                ],
                { cancelable: false }
            );
            throw e
            //console.log(Object)
        }
    }

    return (
        <View style={{ flex: 1, paddingTop: 0, zIndex: 5 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#8e2e9c" />
            <Topbar navigation={navigation} />
            <View style={styles.container}>
                <PreviousPage title="Perfil" navigation={navigation} />

                <View style={styles.ProfileContainer}>
                    <ProfileUserImage firebase={firebase} />
                    <View>

                        <View style={styles.linha}>
                            <View  style={styles.linhaFilho}>
                                <Entypo name="mail"  size={24} color="purple"/>
                                <Text style={styles.text}> Email: </Text>
                            </View>
                            <Text>{email}</Text>
                        </View>
                       
                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Entypo name="location" size={22} color="purple"></Entypo>
                                <Text style={styles.text}> CEP: </Text>
                            </View>
                            <TextInput style={styles.text2} defaultValue={cep} onChangeText={text => setCep(text)} placeholder={cep}></TextInput>
                        </View>
                     
                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Entypo name="map" size={22} color="purple" />
                                <Text style={styles.text}> UF: </Text>
                            </View>
                            <TextInput style={styles.text2} defaultValue={uf} onChangeText={text => setUf(text)} placeholder={uf}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Entypo name="address" size={22} color="purple" />
                                <Text style={styles.text}> City: </Text>
                            </View>
                            <TextInput style={styles.text2} defaultValue={city} onChangeText={text => setCity(text)} placeholder={city}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <MaterialIcons name="location-city" size={22} color="purple" />  
                                <Text style={styles.text}> NBHD: </Text>
                            </View>
                            <TextInput style={styles.text2} defaultValue={street} onChangeText={text => setStreet(text)} placeholder={street}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <MaterialCommunityIcons name="numeric" size={22} color="purple" />
                                <Text style={styles.text}> Nº: </Text>
                            </View>
                            <TextInput style={styles.text2} defaultValue={numberHome} onChangeText={text => setNumberHome(text)} placeholder={numberHome}></TextInput>
                        </View>

                        <View style={styles.linha}>
                            <View style={styles.linhaFilho}>
                                <Feather name="smartphone" size={22} color="purple" />
                                <Text style={styles.text}> Tel: </Text>
                            </View>
                            <TextInput style={styles.text2} defaultValue={phone} onChangeText={text => setPhone(text)} placeholder={phone}></TextInput>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.OutBtn} onPress={() => Alert.alert(
                        "Gardien",
                        "Deseja salvar ?",
                        [
                            {
                            text: "Não",
                            onPress: () => {
                                setEmail(firebase.user.email);
                                setPhone(firebase.user.phone);
                                setCep(firebase.user.cep);
                                setCity(firebase.user.city);
                                setUf(firebase.user.uf);
                                setStreet(firebase.user.street);
                                setNeightborhood(firebase.user.neightborhood);
                                setNumberHome(firebase.user.number.toString());
                            },
                            style: "cancel"
                            },
                            { text: "Sim", onPress: () => {update,  Alert.alert(
                                "Gardien",
                                "Salvo, com sucesso",
                                [
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                                { cancelable: false }
                              )} }
                        ],
                        { cancelable: false }
                        )
                    }>
                        <Text style={styles.OutBtnTxt}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default withFirebaseHOC(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingRight: 10,
        paddingLeft: 10,
        // backgroundColor: '#F4F4FB'
    },
    ProfileContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    OutBtn: {
        flexDirection: 'row',
        backgroundColor: '#B74CAC',
        borderRadius: 20,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7
    },
    OutBtnTxt: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 12
    },
    PreviousPage: {
        // borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 4,
        alignItems: 'center'
    },
    ButtonBox: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 0.4,
        borderColor: 'grey',
        paddingHorizontal: 12,
        paddingVertical: 11
    },
    Title: {
        marginHorizontal: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    linha:{
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderColor: 'grey',
        justifyContent: 'space-between',
    },
    linhaFilho:{
        top: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text2:{
        marginTop: 4,
    },
    text:{
        marginTop: 4,
    }
})