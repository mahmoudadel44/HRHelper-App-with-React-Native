import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { FAB, List } from 'react-native-paper'
import { useSelector, useDispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteCand, deleteAllCands } from '../redux/actions'
import { AntDesign } from '@expo/vector-icons';
import PDFReader from 'rn-pdf-reader-js'
import { Width } from '../constants';

const HomeScreen = (props) => {
  const navigation = useNavigation()
  const { cand } = useSelector(state => state.CandidatesReducer)
  const dispatch = useDispatch()
  const deleteCandidate = (id) => {
    dispatch(deleteCand(id))
  }
  const deleteAllCandidate = () => {
    dispatch(deleteAllCands())
  }
  const cvRef = React.createRef()
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>HR Helper</Text>
      </View>
      {
        cand.length === 0 ? (
          <View>
            <Animatable.Text style={styles.TextStyle} animation="fadeIn" iterationCount={2}>There is no candidate to show</Animatable.Text>
          </View>
        )
          : (
            <FlatList
              style={{ marginBottom: 20 }}
              showsVerticalScrollIndicator={false}
              data={cand}
              renderItem={({ item }) => {
                return (
                  <View style={styles.candidateStyle}>
                    <View style={{
                      flexDirection: 'row'
                      , justifyContent: 'space-between'
                    }}>
                      <Text style={styles.jobTitle}>
                        <Text style={styles.jobTitle}>Job Title: </Text>
                        {item.myCand.jobTitle}
                      </Text>
                      <AntDesign name="delete" size={22} color="#EE1C25"
                        onPress={() => deleteCandidate(item.id)}
                        style={{ marginTop: 5 }}
                      />
                    </View>
                    <Text style={styles.nameStyle}>
                      <Text >Name: </Text>
                      {item.myCand.name}
                    </Text>
                    <Text style={styles.phoneStyle}>
                      <Text >Phone: </Text>
                      {item.myCand.phone}
                    </Text>
                    <Text style={styles.avatarStyle}>Candidate Cv:</Text>

                    <View style={{  height: 450 }}>
                      <PDFReader
                        source={{
                          uri: item.myCand.cv ? item.myCand.cv : 'http'
                        }}
                      />
                    </View>
                  </View>
                )
              }}
              keyExtractor={item => item.id + ''}

            />)}
      <FAB
        style={styles.fab}
        small
        label="Add Candidate"
        icon="plus"
        onPress={() => navigation.navigate('Details'
        )}
      />
      {
        cand.length !== 0 ? (
          <TouchableOpacity style={styles.signIn}
            onPress={() => deleteAllCandidate()}
          >
            <Text style={styles.textSign}>Delete Candidates</Text>
          </TouchableOpacity>
        ) : null}
    </View>
  );
}
export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: '#009387',
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'flex-start',
  },
  TextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009387',
    marginTop: 200,
    marginHorizontal: 60,
    width: '100%'
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  fab: {
    backgroundColor: '#009387',
    position: 'absolute',
    margin: 5,
    right: 0,
    bottom: 0,
  },
  jobTitle: {
    fontSize: 20,
    color: "#204060",
  },
  candidateStyle: {
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#009387',
  },
  nameStyle: {
    fontSize: 20,
    color: "#204060"
  },
  phoneStyle: {
    fontSize: 20,
    color: "#204060"
  },
  avatarStyle: {
    fontSize: 20,
    color: "#204060"
  },
  signIn: {
    width: '40%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#EE1C25',
    marginBottom: 5,
    marginLeft: 3
  },
  textSign: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center'

  },
});