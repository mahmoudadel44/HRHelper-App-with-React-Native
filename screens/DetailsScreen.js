import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, Pressable, } from 'react-native';
import { FAB } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import * as  DocumentPicker from 'expo-document-picker';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { bindActionCreators } from 'redux'
import { useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { addCand } from '../redux/actions'
import { TouchableOpacity } from 'react-native-gesture-handler';
const DetailsSCreen = (props) => {
  const [cvName, setCvName] = useState('')
  const [cv, setCv] = useState('')

  const { control, handleSubmit, errors, reset, getValues, watch, setValue } = useForm()
  const dispatch = useDispatch()

  const navigation = useNavigation()
  const onSave = (data) => {
    let cand = Object.create(data)
    cand.cv = cv
    dispatch(addCand(cand))
    navigation.goBack()
    reset({
      jobTitle: '',
      name: '',
      phone: '',
    })
    setCv('')
    setCvName('')
  }
  const _pick = async () => {

    try {
      const res = await DocumentPicker.getDocumentAsync({
      });

      console.log(
        res.uri
      );
      setCvName(res.name)
      setCv(res.uri)

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>Add New Candidate</Text>
      </View>

      <AntDesign
        style={styles.iconButton}
        name="closecircleo" size={30} color="white"
        onPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView bounces={false} contentContainerStyle={{ marginLeft: 15 }}>

        <Text style={styles.title}>Job Title </Text>
        <Controller
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="Enter Job Title :"
              autoCapitalize="none"
              defaultValue=''
              value={value}
              style={styles.candidateStyle}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
            />
          )}
          control={control}
          name="jobTitle"
          defaultValue=""
          rules={{ required: true }}
        />
        <Text style={styles.title}>Name  </Text>
        <Controller
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="Enter Name :"
              autoCapitalize="none"
              defaultValue=''
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              style={styles.candidateStyle}
            />
          )}
          control={control}
          name="name"
          defaultValue=""
          rules={{ required: true }}
        />
        <Text style={styles.title}>Phone </Text>
        <Controller
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="Enter Phone Number :"
              autoCapitalize="none"
              defaultValue=''
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              style={styles.candidateStyle}
              keyboardType="number-pad"
            />
          )}
          control={control}
          name="phone"
          defaultValue=""
          rules={{ required: true }}
        />

        <Text style={styles.title}>Candidate Cv</Text>
        <TouchableOpacity style={styles.candidateStyle}
          activeOpacity={0.7}
          onPress={_pick}
        >
          <Text style={styles.cvTitleStyle}>{cvName ? cvName : 'Upload your Cv'}</Text>
        </TouchableOpacity>
        {errors.jobTitle || errors.name || errors.phone ? <Animatable.Text style={styles.errorMessage} animation="flipInX" iterationCount={2}>Please enter all fields</Animatable.Text>
          : null}
      </KeyboardAwareScrollView>
      <FAB
        style={styles.fab}
        small
        icon="check"
        onPress={handleSubmit(onSave)}
      />
    </View>
  );
}
export default DetailsSCreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerStyle: {
    backgroundColor: '#009387',
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  TextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4d88',
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconButton: {
    backgroundColor: '#009387',
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 15
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 10
  },
  title: {
    fontSize: 18,
    color: '#204060',
    fontWeight: 'bold',
    marginVertical: 10
  },
  cvTitleStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    marginTop: 5
  },
  candidateStyle: {
    backgroundColor: '#009387',
    width: '95%',
    height: 50,
    borderRadius: 5,
    padding: 7,
    fontSize: 18,
    color: '#fff'
  },

  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 18
  }
});


