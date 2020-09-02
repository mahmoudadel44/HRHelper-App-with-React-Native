import React, { useState } from 'react'
import {
  StyleSheet, Text, View, Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
  ScrollView, SafeAreaView

} from 'react-native';
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
const SignInScreen = () => {
  const { control, handleSubmit, errors, reset, getValues, watch } = useForm()
  const navigation = useNavigation()
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  })
  let emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  let passwordRegx = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/i;


  const updataSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  const signIn = () => {
    navigation.navigate('MainTabScreen')
    reset({
      email: "",
      password: ""
    })

  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" size={24} color="#05375a" />
              <Controller
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    placeholder="Enter Email :"
                    style={styles.textInput}
                    autoCapitalize="none"
                    defaultValue=''
                    keyboardType='email-address'
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}

                  />
                )}
                control={control}
                name="email"
                // rules={{
                //   required: true,
                //   pattern: {
                //     value: emailRegx,
                //   },
                // }}
                defaultValue=""
              />

            </View>
            {errors.email && (
              <Text style={styles.errorText}>invalid email</Text>)}

            <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
            <View style={styles.action}>
              <Feather name="lock" size={24} color="#05375a" />
              <Controller
                render={({ onChange, onBlur, value }) => (

                  <TextInput
                    placeholder="Enter Pasword :"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    defaultValue=''
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}

                  />
                )}
                control={control}
                name="password"
                // rules={{
                //   required: true,
                //   pattern: {
                //     value: passwordRegx,
                //   }

                // }}
                defaultValue=""
              />

              <TouchableOpacity onPress={updataSecureTextEntry}>
                {data.secureTextEntry ?
                  <Feather name="eye-off" size={24} color="black" /> :
                  <Feather name="eye" size={24} color="grey" />

                }
              </TouchableOpacity>
            </View>
            {errors.password && (<Text style={styles.errorText}>invalid Password shoud contain numbers and characters</Text>)}

            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn}
                onPress={handleSubmit(signIn)}
              >
                <Text style={styles.textSign}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.signIn, {
                backgroundColor: '#fff',
                borderRadius: 10,
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 10
              }]}
                onPress={() => navigation.navigate('SignUpScreen')}
              >
                <Text style={[styles.textSign, {
                  color: '#009387'
                }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    height: 88,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    marginTop: 80,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    paddingTop: 12
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#009387',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'

  },
  errorText: {
    color: 'red',
  }
});