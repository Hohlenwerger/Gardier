import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Picker,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    Alert
} from 'react-native';
import Topbar from '../components/topbar';
import { withFirebaseHOC } from "../config/Firebase";
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import {
    AlertRoundImg,
    AlertInput,
    AlertAreaInput,
    AlertStatusForm,
    AlertDropdown,
    AlertDate,
    AlertTime,
    AlertAnonymousBTN
} from '../components/AlertCustomElements'

import AlertMap from '../components/AlertMap'

import {
    CustomButton,
    CustomTextInputWithImg,
    CustomAreaInputWithImg
} from "../components/CustomElements";

import axios from 'axios'

export const AlertLayoutScreen = props => {
    const { children } = props
    const { props: { navigation, route: { name } } } = children
    return (
        <View style={{ flex: 1, paddingTop: 0 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#8e2e9c" />
            <Topbar {...{ navigation }} />
            <View style={styles.container}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        height: '100%'
                    }}
                />
                {children}
            </View>
        </View>
    )
}

const Page1 = props => {
    const { firebase, navigation, route: { name } } = props
    const [subject, setSubject] = React.useState('');
    const [report, setReport] = React.useState('');

    const idx = parseInt(props.route.name.slice(-1)) + 1

    return (
        <ScrollView>
            <View style={styles.AlertContainer}>
                <View style={styles.AlertBox}>
                    <View style={styles.Imgcontainer}>
                        <AlertRoundImg />
                    </View>
                    <View style={styles.AlertForm1}>

                        <Text style={styles.AlertaTitle}>Faça um alerta.</Text>
                        <AlertInput
                            setContent={setSubject}
                            label={"Sobre o que é o alerta?"}
                            placeholder={"Assunto"}
                            Icon={({ styles }) => <SimpleLineIcons name="note" size={18} color="#40386F" style={styles} />}
                        />
                        <AlertAreaInput
                            setContent={setReport}
                            label={"Diga o que aconteceu"}
                            placeholder={"Relato"}
                            Icon={({ styles }) => <MaterialCommunityIcons name="comment-text-outline" size={20} color="black" style={styles} />}
                        />
                    </View>
                    <View style={styles.Alert1Buttons}>
                        <CustomButton
                            style={styles.AlertButton}
                            onPress={_ => props.navigation.navigate(`Alert-${idx}`, { subject, report })} title="Próximo"
                        />
                        <View style={styles.teste1}>
                            <AlertStatusForm PagesLen={2} currPage={name} inputs={subject, report} navigate={props.navigation.navigate} />
                            <TouchableOpacity style={styles.BackBtn} onPress={_ => navigation.navigate('Home')}>
                                <Text style={styles.back}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const Page2 = props => {
    const { firebase, navigation, route: { name, params } } = props
    const [severity, setSeverity] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [date, setDate] = React.useState(new Date())
    const [time, setTime] = React.useState('')
    const [anonymous, setAnonymous] = React.useState(true)
    const arrElements = ['Alta', 'Média', 'Baixa', 'Muito Baixa']

    React.useEffect(_ => {
        console.log(params)
    }, [props])

    const setSeverity_ = v => {
        const find = arrElements.findIndex(a => v === a)
        setSeverity(find)
    }

    const parseDate = _ => {
        const currDate = new Date()
        const currMonth = currDate.getMonth()
        const currYear = currDate.getFullYear()
        const [day, month] = date

        const alertYear = _ => month > currMonth ? currYear - 1 : currYear
        console.log(`${alertYear()}-${month}-${day}T${time}Z`)
        const alertDate = new Date(`${alertYear()}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${time}Z`)
        console.log(alertDate)
        return alertDate
    }
    const handleNewAlert = async () => {
        // const yourGeoPoint = new GeoPoint(-21.2225, -47.8238);
        let cleaned = ('' + address.postalCode).replace(/\D/g, '');
        axios.get(`https://viacep.com.br/ws/${cleaned}/json`).then(async res => {
            const { logradouro, bairro, localidade, uf } = res.data

            const addAlert = {
                autor: firebase.token,
                anonymous: anonymous,
                subject: params.subject,
                content: params.report,
                gravity: severity,
                comments: 0,
                upvotes: 0,
                location: address.latlng,
                cep: cleaned,
                city: localidade,
                neighborhood: bairro,
                street: logradouro,
                uf,
                deleted: false,
                deleted_at: null,
                date: new Date(parseDate()),
                created_at: new Date(),
                updated_at: new Date(),
            }

            console.log(addAlert)
            console.log(date, time)

            try {
                firebase.FIREBASE
                    .firestore()
                    .collection("ALERT")
                    .doc()
                    .set(addAlert)

                Alert.alert(
                    "Alerta Criado",
                    "O aviso foi gerado e estará disponível em breve!",
                    [
                        {
                            text: "Ir ao Feed",
                            onPress: () => navigation.navigate('Home', {refresh: true})
                        },
                    ],
                    { cancelable: false }
                );

            } catch (error) {
                Alert.alert(
                    "Erro ao gerar alerta!",
                    error.message,
                    [
                        { text: "Fechar" }
                    ],
                    { cancelable: false }
                );
                throw error
            }
        })

    }
    return (
        <ScrollView>
            <View style={styles.AlertBox}>
                <KeyboardAvoidingView style={styles.AlertForm2}>
                    <AlertDropdown
                        setSeverity={setSeverity_}
                        label={"Selecione a gravidade do ocorrido"}
                        arrElements={arrElements}
                    />
                    <AlertMap
                        setAddress={setAddress}
                    />
                    <AlertDate
                        setDate={setDate}
                        label={"Quando ocorreu?"}
                    />
                    <AlertTime
                        setTime={setTime}
                        Icon={({ styles }) => <Feather name="clock" size={18} color="black" style={styles} />}
                        label={"Em que horário, mais ou menos?"}
                    />
                    <AlertAnonymousBTN
                        label={"Publicar em modo anonimo"}
                        setAnonymous={setAnonymous}
                    />
                    <CustomButton
                        style={styles.AlertButton}
                        onPress={handleNewAlert} title="Criar Alerta"
                    />

                    <View style={styles.teste2}>
                        <AlertStatusForm PagesLen={2} currPage={name} inputs={{ a: Math.random() }} navigate={navigation.navigate} />
                        <TouchableOpacity style={styles.BackBtn} onPress={_ => navigation.pop()}>
                            <Text style={styles.back}>Voltar</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </View>

        </ScrollView>
    )
}

const AlertPage1 = props => {
    return (
        <AlertLayoutScreen>
            <Page1 {...props} />
        </AlertLayoutScreen>
    )
}

const AlertPage2 = props => {
    return (
        <AlertLayoutScreen>
            <Page2 {...props} />
        </AlertLayoutScreen>
    )
}

export const Alert1 = withFirebaseHOC(AlertPage1)

export const Alert2 = withFirebaseHOC(AlertPage2)

export const AlertScreen = withFirebaseHOC(AlertLayoutScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#7e298b',
    },
    AlertContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    AlertBox: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center'
    },
    Imgcontainer: {
        marginTop: 25,
        marginBottom: -25
    },
    AlertaTitle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'serif',
        textAlign: 'left',
        marginBottom: 15,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    AlertForm1: {
        width: 240,
        alignItems: 'center'
        // borderWidth: 1,   
    },
    AlertForm2: {
        width: 240,
        flex: 1,
        // borderWidth: 1,
        justifyContent: 'space-around',
    },
    AlertButton: {
        width: 240,
        marginTop: 10
    },
    BackBtn: {
        // alignSelf: 'center'
    },
    back: {
        color: 'white',
        textAlign: 'center',
        // fontSize: 14
    },
    Alert1Buttons: {
        flex: 0.7,
        justifyContent: "space-around"
    },
    teste1: {
        // borderWidth: 1,
        paddingTop: 15,
        flex: 0.5,
        justifyContent: 'space-between',
        paddingBottom: 0
    },
    teste2: {
        // borderWidth: 1,
        paddingTop: 15,
        flex: 0.6,
        justifyContent: 'space-around'
    }
})