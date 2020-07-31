import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Picker
} from 'react-native';
import {
    CustomMiniInput,
    CustomTextInputWithImg,
    CustomAreaInputWithImg
} from "./CustomElements";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SimpleLineIcons, MaterialCommunityIcons, EvilIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';
import megafone from '../assets/images/alert-img.jpg'
import { TextInput } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const AlertInput = ({ label, placeholder, Icon, setContent, onBlur, type, value }) => {
    return (
        <View>
            {label && <Text style={styles.AlertInputLabel}>{label}</Text>}
            <CustomTextInputWithImg
                type={type}
                value={value}
                Icon={Icon}
                placeholder={placeholder}
                setContent={setContent}
                onBlur={onBlur} />
        </View>
    )
}

export const AlertAreaInput = ({ label, placeholder, Icon, setContent }) => {
    return (
        <View>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <CustomAreaInputWithImg
                setContent={setContent}
                Icon={Icon}
                placeholder={placeholder} />
        </View>
    )
}

export const AlertRoundImg = props => (
    <View style={styles.imgContainer}>
        <LinearGradient start={[0, 0.5]}
            end={[1, 0.5]}
            colors={['#ae29c0', '#6e1a9e']}
            style={{ borderRadius: 0 }, styles.imgBorder}>
            <Image source={megafone} style={styles.img} />
        </LinearGradient>
    </View>
)

export const ProfileRoundImg = props => (
    <LinearGradient start={[0, 0.4]}
        end={[1, 0.5]}
        colors={['#c026d4', '#7c24af']}
        style={{ borderRadius: 0 }, styles.ProfileBorder}>
        <Image {...props} style={styles.img} />
    </LinearGradient>
)

export const AlertStatusForm = ({ PagesLen, currPage, navigate, inputs }) => {
    const idx = parseInt(currPage.slice(-1)) - 1

    const generateCurrPage = (PagesLen, currIdx) => {
        const circleRadius = 15
        const elementsArr = []
        for (let i = 0; i < PagesLen; i++) {
            let element = (
                <TouchableOpacity
                    onPress={_ => navigate(`Alert-${i + 1}`, inputs)}
                    key={`Alert-${i}`}
                    style={[styles.AlertCircle,
                    { width: circleRadius, height: circleRadius },
                    idx == i && { backgroundColor: 'white' }]}></TouchableOpacity>
            )
            elementsArr.push(element)
        }

        return (
            <View style={styles.AlertPageStatus}>
                {elementsArr}
            </View>
        )
    }

    return (
        <View style={styles.AlertCirclesBox}>
            {generateCurrPage(PagesLen, idx)}
        </View>
    )
}

export const AlertDropdown = ({ arrElements, setSeverity, label }) => {
    const [curr, setCurr] = React.useState(arrElements[0])
    const handleChange = value => {
        setSeverity(value)
        setCurr(value)
    }
    return (
        <View>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <View style={styles.AlertDropdownBox}>
                <View style={styles.AlertDropdownIcon}>
                    <Feather name="alert-triangle" size={21} color="#40386F" />
                </View>

                <Picker
                    selectedValue={curr}
                    style={styles.AlertDropdown}
                    onValueChange={(itemValue, itemIndex) => handleChange(itemValue)}>
                    {arrElements.map(label => (
                        <Picker.Item key={label} label={label} value={label} />
                    ))}
                </Picker>
                <AntDesign name="down" size={24} color="black" />
            </View>
        </View>
    )
}

export const AlertDate = ({ label, setDate }) => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const getDayIdx = _ => 5
    const [curr, setCurr] = React.useState(months[getDayIdx()])
    const [inputs, setInputs] = React.useState([])

    const handleChange = (value, idx) => {
        setContent(idx, 1)
        setCurr(value)
    }

    const setContent = (value, idx) => {
        const input = inputs
        input[idx] = value

        setInputs(input)
        setDate(input)
    }

    return (
        <View style={{ marginTop: 5 }}>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <View style={styles.AlertDate}>
                <CustomMiniInput setContent={v => setContent(v, 0)} label={"Dia"} numeric={true} />
                <View style={[styles.AlertDropdownBox, styles.AlertDropdownDateBox]}>
                    <Picker
                        selectedValue={curr}
                        style={[styles.AlertDropdown, styles.AlertDropdownDate]}
                        onValueChange={(itemValue, itemIndex) => handleChange(itemValue, itemIndex)}>
                        {months.map(label => (
                            <Picker.Item key={label} label={label} value={label} />
                        ))}
                    </Picker>
                </View>

            </View>
        </View>
    )
}

export const AlertTime = ({ label, Icon, setTime }) => {
    const [value, setValue] = React.useState('')

    const handleChange = value => {
        setTime(value)
        setValue(value)
    }

    return (
        <View style={styles.AlertTimeContainer}>
            <Text style={styles.AlertInputLabel}>{label}</Text>
            <View style={styles.AlertTime}>
                <View style={styles.AlertTimeIcon}>
                    <Icon styles={{ textAlign: 'center' }} />
                </View>
                <TextInput
                    value={value} onChangeText={handleChange} style={{ color: 'white' }} placeholder={"hh:mm"} />
            </View>
        </View>

    )
}

export const AlertAnonymousBTN = ({ setAnonymous, label }) => {
    const [checked, setChecked] = React.useState(true)

    const CheckWrapper = ({ selected, onPress, style, textStyle, size = 30, color = '#211f30', text = '', ...props }) => (
        <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
            <Icon
                size={size}
                color={color}
                name={selected ? 'check-box' : 'check-box-outline-blank'}
            />

            <Text style={textStyle}> {text} </Text>
        </TouchableOpacity>
    )

    const handleCheck = _ => {
        setAnonymous(!checked)
        setChecked(!checked)
    }

    return (
        <View>
            <View style={styles.item} >
                <CheckBox
                    checked={checked}
                    color="#fc5185"
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={handleCheck} />
                <Text style={
                    {
                        ...styles.checkBoxTxt,
                        color: checked ? "#fc5185" : "gray",
                        fontWeight: checked ? "bold" : "normal"
                    }}
                >{label}</Text>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
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
    ProfileBorder: {
        borderRadius: 100,
        width: 107,
        height: 105,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'green',
        elevation: 2
    },
    img: {
        width: 100,
        height: 101,
        borderRadius: 100,
        borderWidth: 10
    },
    AlertInputLabel: {
        fontSize: 12,
        fontWeight: "300",
        color: '#fff',
        marginLeft: 10,
        marginBottom: 3,
        marginTop: 6
    },
    back: {
        color: 'white',
        textAlign: 'center',
    },
    AlertPageStatus: {
        flexDirection: 'row',
        width: 40,
        justifyContent: 'space-between',
        borderColor: 'red'
    },
    AlertCirclesBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
    },
    AlertCircle: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 2
    },
    AlertDropdownBox: {
        backgroundColor: '#A577B4',
        flexDirection: 'row',
        width: 240,
        height: 35,
        alignItems: 'center',
        paddingLeft: 12,
        borderRadius: 100,
    },
    AlertDropdownIcon: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 25,
        height: 25,
        alignItems: 'center'
    },
    AlertDropdown: {
        backgroundColor: '#A577B4',
        color: 'white',
        width: 160,
        borderWidth: 1,
        borderRadius: 100,
        height: 30
    },
    AlertDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1
    },
    AlertDropdownDateBox: {
        width: 150,
        paddingLeft: 15,
    },
    AlertDropdownDate: {
        width: 126
    },
    AlertItem: {
        borderRadius: 100,
        height: 300,
    },
    AlertTimeContainer: {
        alignItems: 'center',
        marginTop: 11
    },
    AlertTime: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#9F91B5',
        paddingLeft: 5,
        color: 'white',
        width: 100,
        minHeight: 35,
        maxHeight: 220
    },
    AlertTimeIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 27,
        height: 26,
        paddingHorizontal: 0,
        paddingVertical: 2,
        marginRight: 5,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    Teste: {
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center'
    },
    item: {
        width: "80%",
        alignItems: 'center',
        borderRadius: 20,
        padding: 0,
        marginBottom: 10,
        flexDirection: "row",
    },
    checkBoxTxt: {
        marginLeft: -25
    },
})