import * as React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ImageBackground,
    Alert,
    View,
    Image,
    Text
} from 'react-native';
import {
    CustomText,
    CustomTextInput,
    CustomButton
} from "../components/CustomElements";
import { withFirebaseHOC } from "../config/Firebase";
import { AlertInput } from '../components/AlertCustomElements';
import { SimpleLineIcons, Ionicons, Fontisto, Feather, EvilIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import megafone from '../assets/images/teste.jpeg'
import { AlertLayoutScreen } from './AlertScreen';
import axios from 'axios'

const RegisterScreen = (props) => {
    const { navigation, firebase } = props;
    const [botaoRegistrarDesativado, setBotaoRegistrarDesativado] = React.useState(true)
    const [name, setName] = React.useState('');
    const [nick, setNick] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [cep, setCEP] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    React.useEffect(_ => {
        if (name.length && nick.length && email.length &&
            cep.length && phone.length && number.length &&
            password.length && confirmPassword.length)
            setBotaoRegistrarDesativado(false)
    })

    const handleOnRegister = async _ => {
        try {
            const CEPvalidation = /^[0-9]{8}$/
            let cleaned = ('' + cep).replace(/\D/g, '');
            if (CEPvalidation.test(cleaned)) {
                axios.get(`https://viacep.com.br/ws/${cleaned}/json`).then(async res => {
                    const { logradouro, bairro, localidade, uf } = res.data

                    const addUser = {
                        email: email,
                        nickname: nick,
                        name: name.split(' ')[0],
                        surname: name.split(' ').slice(1).join(' '),
                        customer_rating: 99,
                        phone: phone,
                        cep: cleaned,
                        city: localidade,
                        neighborhood: bairro,
                        street: logradouro,
                        number: parseInt(number),
                        uf,
                        created_at: new Date(),
                        updated_at: new Date()
                    }

                    const token = await firebase.registerUserWithEmail(email, password, addUser)
                    firebase.RegisterUser(token, addUser)
                })
            } else {
                console.log(cep)
            }
        } catch (error) {
            Alert.alert('error', error.message)
        }
    }

    const updateName = name => {
        setName(name)
    }

    const updateNick = nick => {
        setNick(nick)
    }


    const updateEmail = email => {
        setEmail(email)
    }

    const updateCEP = cep => {
        // \D -> Apaga tudo que NÃO for número
        let cleaned = ('' + cep).replace(/\D/g, '');
        if (cleaned.length > 8)
            return

        let match = cleaned.match(/^(\d{5})(\d{3})?$/);
        if (match)
            setCEP([match[1], "-", match[2]].join(''))
        else
            setCEP(cep)
    }

    const updateNumber = number => {
        setNumber(number)
    }

    const updatePhone = phone => {
        //Filter only numbers from the input
        let cleaned = ('' + phone).replace(/\D/g, '');
        if (cleaned.length > 11) return;
        //Check if the input is of correct
        let match = cleaned.match(/^(\d{2})(\d{5})?(\d{4})?$/);
        if (match) {
            //Remove the matched extension code
            //Change this to format for any country code.
            setPhone(['(', match[1], ') ', match[2], match[2] && '-', match[3]].join(''))
        } else setPhone(phone)
    }

    const updatePassword = password => {
        setPassword(password)
    }

    const updateConfirmPassword = password => {
        setConfirmPassword(password)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <AlertLayoutScreen>
                <View
                    style={[styles.box]}
                    {...props}>
                    <View style={styles.imgContainer}>
                        <LinearGradient start={[0, 0.5]}
                            end={[1, 0.5]}
                            colors={['#9724a7', '#7c24af']}
                            style={{ borderRadius: 0 }, styles.imgBorder}>
                            <Image source={megafone} style={styles.img} />
                        </LinearGradient>
                    </View>

                    <Text style={styles.header}>Crie sua conta.</Text>
                    <View style={styles.input}>
                        <AlertInput
                            setContent={updateName}
                            type="text"
                            style={styles.input}
                            placeholder="Nome Completo"
                            Icon={({ styles }) => <Ionicons name="md-person" size={20} color="#40386F" />}
                        />
                    </View>

                    <View style={styles.input}>
                        <AlertInput
                            setContent={updateNick}
                            type="text"
                            style={styles.input}
                            placeholder="Apelido"
                            Icon={({ styles }) => <Fontisto name="person" size={19} color="black" />}
                        />
                    </View>

                    <View style={styles.input}>
                        <AlertInput
                            setContent={updateEmail}
                            type="emailAddress"
                            style={styles.input}
                            placeholder="Email"
                            Icon={({ styles }) => <Feather name="mail" size={18} color="black" />}
                        />
                    </View>

                    <View style={styles.input}>
                        <AlertInput
                            setContent={updateCEP}
                            value={cep}
                            type="number"
                            style={styles.input}
                            placeholder="CEP"
                            Icon={({ styles }) => <EvilIcons name="location" size={25} color="black" style={{ marginLeft: -3 }} />}
                        />
                    </View>

                    <View style={styles.input}>
                        <AlertInput
                            setContent={updateNumber}
                            type="number"
                            style={styles.input}
                            placeholder="Número"
                            Icon={({ styles }) => <Feather name="home" size={19} color="black" style={{ marginLeft: -1 }} />}
                        />
                    </View>

                    <View style={styles.input}>
                        <AlertInput
                            setContent={updatePhone}
                            value={phone}
                            type="number"
                            style={styles.input}
                            placeholder="Telefone"
                            Icon={({ styles }) => <Feather name="smartphone" size={20} color="black" style={{ marginLeft: -1 }} />}
                        />
                    </View>


                    <View style={styles.input}>
                        <AlertInput
                            setContent={updatePassword}
                            secureTextEntry={true}
                            type="password"
                            style={styles.input}
                            placeholder="Senha"
                            Icon={({ styles }) => <EvilIcons name="unlock" size={27} color="black" style={{ marginLeft: -5 }} />}
                        />
                    </View>

                    <View style={styles.input}>
                        <AlertInput
                            setContent={updateConfirmPassword}
                            secureTextEntry={true}
                            type="password"
                            style={styles.input}
                            placeholder="Confirmar senha"
                            Icon={({ styles }) => <EvilIcons name="lock" size={27} color="black" style={{ marginLeft: -5 }} />}
                        />
                    </View>



                    <CustomButton isDisabled={botaoRegistrarDesativado}
                        onPress={() => handleOnRegister()} title="Registrar"
                        style={{ ...styles.input, marginTop: 25 }} />
                    <CustomText onPress={() => props.navigation.navigate('Login')}
                        style={styles.opcoesFinais}>
                        Tem uma conta? Conecte-se
                </CustomText>
                </View>

            </AlertLayoutScreen>

        </KeyboardAvoidingView>

    );
}

const Refresh = props => <RegisterScreen key={Math.random()} {...props} />

export default withFirebaseHOC(Refresh)

RegisterScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    box: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
        paddingHorizontal: 200
    },
    header: {
        color: "white",
        fontSize: 20,
        width: '65%',
        textAlign: "left",
        marginBottom: 10,
    },
    logo_container: {
        flex: 1,
        position: 'absolute',
        top: '35%',
        zIndex: 5,
        width: '100%',
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        borderLeftColor: 'green',
        borderLeftWidth: 1,
        borderRightColor: 'green',
        borderRightWidth: 1,
        alignSelf: 'center',
    },
    title: {
        width: '100%',
        fontSize: 32,
        marginTop: 15
    },
    subtitle: {
        marginVertical: 15,
        fontSize: 11,
        color: 'grey'
    },
    input: {
        paddingVertical: 5,
        alignSelf: 'center',
    },
    imageBg: {
        width: '100%',
        height: 70,
        resizeMode: "cover",
        justifyContent: 'flex-end',
        justifyContent: 'center',
    },
    opcoesFinais: {
        color: 'grey',
        textAlign: 'center',
        width: '100%',
        fontSize: 14,
        marginTop: 25
    },
    imgContainer: {
        borderRadius: 100,
        width: 115,
        height: 112,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#A577B4',
        marginBottom: 25
    },
    imgBorder: {
        borderRadius: 100,
        width: 107,
        height: 106,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#A577B4'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 10
    },
})