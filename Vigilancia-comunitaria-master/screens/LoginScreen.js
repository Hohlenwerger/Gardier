import * as React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ImageBackground,
    AsyncStorage,
    Button,
    Alert
} from 'react-native';
import * as theme from "../constants/Theme.js";
import {
    CustomText,
    CustomTextInput,
    CustomButton
} from "../components/CustomElements";
import { withFirebaseHOC } from "../config/Firebase";

const VALID_EMAIL = "";
const VALID_PASSWORD = "";
const LoginScreen = (props) => {
    const { navigation, firebase } = props;

    const [email, setEmail] = React.useState(VALID_EMAIL);
    const [password, setPassword] = React.useState(VALID_PASSWORD);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [botaoLogarDesativado, setBotaoLogarDesativado] = React.useState(true)
    const [authState, setAuthState] = React.useState(null);

    const handleOnLogin = async _ => {
        try {
            const response = await firebase.loginWithEmail(email, password);
            if (response.user) {
                firebase.setToken(response.user.uid)
                Alert.alert(`Bem vindo ${response.user.email}`)
            } else {
            }
        } catch (error) {
            Alert.alert('error', error.message)
            //actions.setFieldError("general", error.message);
        } finally {
            // Alert.alert('submit')
            // actions.setSubmitting(false);
        }
    }

    const handleLoginGoogle = _ => {
        // const addUser = {
        //     email: "matheudb@gmail.com",
        //     nickname: "Simo",
        //     name: "Matheus",
        //     surname: "Hohlenwerger",
        //     customer_rating: 99,
        //     phone: "16981893153",
        //     cep: "13570540",
        //     city: "São Carlos",
        //     neightborhood: "Jd. Mercedes",
        //     street: "Rua Alfeo Ambrogio",
        //     number: "1138",
        //     uf: "SP",
        //     created_at: new Date(),
        //     updated_at: new Date()
        //=======
        // try {
        //     const pack_cadastro = {
        //         cep: "13570540",
        //         city: "São Carlos",
        //         customer_rating: 99,
        //         email: "matheudb@gmail.com",
        //         name: "Matheus",
        //         number: "1116",
        //         phone: "16981893153",
        //         street: "Rua Alfeo Ambrogio",
        //         surname: "Hohlenwerger",
        //         uf: "SP"
        //     }

        //     firebase.FIREBASE
        //         .firestore()
        //         .collection("USER")
        //         .doc()
        //         .set(pack_cadastro);

        // } catch (e) {
        //     console.log(e)
        // }

        // var firebaseAddReturn = firebase.FIREBASE
        //     .firestore()
        //     .collection("USER")
        //     .doc('2ytPUBqF8jNjhy5aUxDdI0Qh0GO2')
        //     .set(addUser)

        const response = firebase.loginWithGoogle()

        // let userDoc
        // firebase
        //     .FIREBASE
        //     .firestore()
        //     .collection("USER")
        //     .doc('2ytPUBqF8jNjhy5aUxDdI0Qh0GO2')
        //     .get().then(function (doc) {
        //         // console.log(doc)
        //         if (doc.exists) {
        //             userDoc = doc.data()
        //             console.log(userDoc)
        //         } else {
        //             // * error / not found *
        //         }
        //     })
    }

    React.useEffect(_ => {
        if (email.length > 0 && password.length > 0) setBotaoLogarDesativado(false)
    })

    const updateEmail = email => {
        setEmail(email)
    }

    const updatePassword = password => {
        setPassword(password)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground source={require('../assets/images/login-bg.png')} style={[styles.image]}>

                <CustomTextInput
                    onChangeText={updateEmail}
                    value={email}
                    textContentType="emailAddress"
                    type="emailAddress"
                    style={styles.input}
                    placeholder="Email"
                />
                <CustomTextInput
                    onChangeText={updatePassword}
                    value={password}
                    secureTextEntry={true}
                    textContentType="password"
                    type="password"
                    style={{ ...styles.input, marginBottom: 25 }}
                    placeholder="Senha"
                />
                <CustomButton isDisabled={botaoLogarDesativado}
                    onPress={() => handleOnLogin()} title="Entrar" />
                <CustomText onPress={() => props.navigation.navigate('Registro', { refresh: true })}
                    style={styles.opcoesFinais}>
                    Esqueceu a senha?
                </CustomText>
                <CustomText onPress={() => props.navigation.navigate('Registro', { refresh: true })}
                    style={styles.opcoesFinais}>
                    Criar uma nova conta
                </CustomText>
                <Button
                    title="Logar com Google "
                    onPress={async () => handleLoginGoogle()}
                />
            </ImageBackground>

        </KeyboardAvoidingView >
    );
}

export default withFirebaseHOC(LoginScreen)

LoginScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        padding: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
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
        padding: 13,
        paddingLeft: 25,
        marginBottom: 5,
        alignSelf: 'center',
        marginTop: 15,
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
    }
})