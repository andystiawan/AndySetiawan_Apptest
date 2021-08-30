import React, { useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { styleds } from './styleds';
import {
  addContact, 
  getContact, 
  closePopUp} from '../../component/component-redux/redux-action/ContactAction';
import AlertMessage from '../../component/component-alert/AlertMessage';

function AddContact({
  addContact, 
  ContactReducer, 
  getContact, 
  closePopUp, 
  navigation}){
  const addData = {
    firstName : "",
    lastName : "",
    age : "",
    photo: "https://picsum.photos/200/300"
  };
  const [data, setData] = useState(addData);
  const handleSave = () => {
    addContact(data)
  };
  const handleClose = async() => {
    try {
      closePopUp();
      await getContact();
      navigation.navigate('Contact');
    } catch (error) {
      console.log(error);
    }
  };
  return(
    <SafeAreaView 
      style={{ 
        flex:1,
        backgroundColor:'white'}}>
      <ScrollView contentContainerStyle={{
        alignItems:'center',
        margin:5}}>
        <TextInput 
          keyboardType="default"
          placeholder="First name"
          onChangeText={(e)=> 
            setData(p => ({...p,firstName:e}))}
          style={styleds.txtInput}
        />
        <TextInput 
          keyboardType="default"
          placeholder="Last name"
          onChangeText={(e)=> 
            setData(p => ({...p,lastName:e}))}
          style={styleds.txtInput}
        />
        <TextInput 
          keyboardType="number-pad"
          placeholder="Age"
          onChangeText={(e)=> 
            setData(p => ({...p,age:e}))}
          style={styleds.txtInput}
        />
        <TouchableOpacity 
          onPress={handleSave}
          disabled={
            data.firstName === "" ||
            data.lastName === "" ||
            data.age === ""} 
          style={[styleds.btnSave,{
            backgroundColor:
            data.firstName === "" ||
            data.lastName === "" ||
            data.age === "" ?
            'grey' : 'green'
          }]}>
          <Text style={styleds.txtSave}> SAVE </Text>
        </TouchableOpacity>
      </ScrollView>
      <AlertMessage
      open={ContactReducer.show}
      type={ContactReducer.message?.type}
      message={ContactReducer.message?.message}
      action={handleClose}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  ContactReducer: state.ContactReducer,
})

const mapDispatchToProps = {
  addContact,
  closePopUp,
  getContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);