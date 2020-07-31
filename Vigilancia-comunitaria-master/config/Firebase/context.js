import React, { createContext } from "react";
import { AsyncStorage } from 'react-native'
import Firebase from './firebase'

const FirebaseContext = createContext();

const FirebaseConsumer = FirebaseContext.Consumer;

const FirebaseProvider = FirebaseContext.Provider;

const FirebaseProviderComponent = ({ setLoggedIn, children }) => {
  const [token, setToken_] = React.useState()
  const [user, setUser] = React.useState({})

  React.useEffect(_ => {
    getUserDataStorage()
    console.log(user)
  }, [])

  React.useEffect(_ => {
    if (token === null) {
      setLoggedIn(false)
    }
  }, [token])

  const setToken = token => {
    if (token) {
      setLoggedIn(true)
      Firebase.getUserData(token)
        .then(doc => {
          if (doc.exists) {
            let user = doc.data()
            setUser(user)
            setToken_(token)
            AsyncStorage.setItem('user', JSON.stringify(user))
            AsyncStorage.setItem('token', token)
          } else {
            // * error / not found *
          }
        })
    } else {
      handleLogout()
    }
  }

  const handleLogout = _ => {
    setToken_(null)
  }

  const RegisterUser = (token, user) => {
    setToken_(token)
    setUser(user)
    setLoggedIn(true)
    AsyncStorage.setItem('user', JSON.stringify(user))
    AsyncStorage.setItem('token', token)
  }

  const getUserDataStorage = async _ => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        const user = await AsyncStorage.getItem('user')
        setToken_(token)
        setUser(JSON.parse(user))
        console.log(JSON.parse(user))
        setLoggedIn(true)
      }
    } catch (e) {
      console.log('erro', e.message)
    }

  }
  return (
    <FirebaseProvider value={{
      ...Firebase,
      token,
      setToken,
      user,
      setUser,
      RegisterUser,
    }}>
      {children}
    </FirebaseProvider>
  )
}

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
);

export { FirebaseProviderComponent as FirebaseProvider }