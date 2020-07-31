import React, { useEffect } from 'react'
import { Text, TouchableOpacity, TextInput, StyleSheet, View, Image, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export const CustomText = props => {
  let fontFamily = 'ubuntu'
  if (props.bold) fontFamily += '-bold'
  if (props.italic) fontFamily += '-italic'

  const { style, ...otherProps } = props

  return <Text style={{ fontFamily, ...style }} {...otherProps}>{props.children}</Text>
}

export const CustomTextInput = props => {
  let fontFamily = 'ubuntu'
  if (props.bold) fontFamily += '-bold'
  if (props.italic) fontFamily += '-italic'

  const { style, ...otherProps } = props

  return (
    <TextInput style={[styles.textInput, { fontFamily, ...style }]} {...otherProps} />
  )
}

export const CustomTextInputWithImg = props => {
  const { Icon, setContent, onBlur } = props
  const [value, setValue] = React.useState()

  const updateValue = v => {
    setValue(v)
    try {
      setContent(v)
    } catch (e) {
      //
    }

  }

  React.useEffect(_ => {
    // console.log(props)
  })

  const handleBlur = v => {
    try {
      const value = v.nativeEvent.text
      if (typeof value === 'string')
        onBlur(value)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <View style={styles.CustomTextInputWithImg}>
      <View style={styles.CustomTextInputImg}>
        <Icon styles={{ textAlign: 'center' }} />
      </View>

      <TextInput
        secureTextEntry={props.type === 'password'}
        multiline={!props.type === 'password'}
        onChangeText={updateValue}
        onEndEditing={handleBlur}
        onBlur={handleBlur}
        value={props.value || value}
        style={styles.CustomTextInputWithImgImput}
        placeholder={props.placeholder} />
    </View>
  )
}

export const CustomAreaInputWithImg = props => {
  const { Icon } = props
  const defaultRadius = styles.CustomTextInputWithImg.borderRadius
  const [isMultiline_, setMultiline_] = React.useState(false)
  const [height_, setHeight_] = React.useState(200)
  const [borderRadius_, setBorderRadius_] = React.useState(defaultRadius)
  const [value, setValue] = React.useState('')

  const handleFocus = _ => {
    setMultiline_(true)
    setBorderRadius_(12)
  }

  const handleBlur = _ => {
    setMultiline_(false)
    setBorderRadius_(defaultRadius)
  }

  const updateValue = value => {
    props.setContent(value)
    setValue(value)
  }

  const newStyle = { borderRadius: borderRadius_, height: height_, textAlignVertical: 'top', paddingTop: 5, alignItems: 'flex-start' }

  return (
    <View style={[styles.CustomTextInputWithImg, newStyle]}>
      {isMultiline_ ? null : (
        <View style={styles.CustomTextInputImg}>
          <Icon styles={{ textAlign: 'center' }} />
        </View>)}


      <TextInput
        type={props.type || 'text'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={isMultiline_}
        onChangeText={updateValue}
        value={value}
        style={[styles.CustomTextInputWithImgImput, newStyle]}
        placeholder={props.placeholder}
      />
    </View>
  )
}

export const CustomMiniInput = props => {
  const [value, setValue] = React.useState()
  let fontFamily = 'ubuntu'
  if (props.bold) fontFamily += '-bold'
  if (props.italic) fontFamily += '-italic'

  const { style, label, setContent, ...otherProps } = props

  const handleChange = v => {
    setContent(v)
    setValue(v)
  }

  return (
    <TextInput
      keyboardType={Platform.OS !== 'ios' ? "numeric" : "number-pad"}
      placeholder={label} value={value} onChangeText={handleChange} style={styles.CustomMiniInput} />
  )
}

export const CustomButton = props => {
  const { style, textStyle, title, children, isDisabled, ...otherProps } = props
  const [SisDisabled, setDisabled] = React.useState(isDisabled)

  useEffect(_ => {
    setDisabled(isDisabled)
  })
  return (
    <TouchableOpacity disabled={SisDisabled} style={{ ...styles.button, ...style, ...(isDisabled ? styles.disabled : {}) }} {...otherProps}>
      <CustomText bold={true} style={{ color: 'white', fontSize: 16, textAlign: 'center', lineHeight: 15, textAlignVertical: 'center', ...textStyle }} >
        {title ? title : children}
      </CustomText>
    </TouchableOpacity>
  )
}

export const ProfileRoundImg = props => (
  <LinearGradient start={[0, 0.4]}
    end={[1, 0.5]}
    colors={['#c026d4', '#7c24af']}
    style={{ borderRadius: 0 }, styles.ProfileBorder}>
    <Image {...props} style={styles.img} />
  </LinearGradient>
)

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    width: '70%',
    height: 40,
    backgroundColor: '#CF62A4',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#9290B3'
  },
  CustomTextInputWithImg: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#9F91B5',
    paddingLeft: 10,
    color: 'white',
    width: 240,
    minHeight: 35,
    maxHeight: 220
  },
  CustomTextInputImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 26,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  CustomTextInputWithImgImput: {
    minHeight: 35,
    maxHeight: 220,
    borderRadius: 25,
    // borderColor: 'grey',
    // borderWidth: 0.7,
    color: 'white',
    paddingHorizontal: 7,
    flex: 1,
  },
  textInput: {
    borderRadius: 25,
    borderColor: 'grey',
    borderWidth: 0.7,
    color: 'white',
    width: '70%'
  },
  CustomMiniInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#9F91B5',
    paddingLeft: 15,
    color: 'white',
    width: 60,
    minHeight: 35,
    maxHeight: 220
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
})