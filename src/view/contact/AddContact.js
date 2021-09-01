import React, { useState } from 'react';
import { 
  Image,
  SafeAreaView, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View} from 'react-native';
import { connect } from 'react-redux';
import { styleds } from './styleds';
import {
  addContact, 
  getContact, 
  closePopUp} from '../../component/component-redux/redux-action/ContactAction';
import AlertMessage from '../../component/component-alert/AlertMessage';
import HeaderContact from '../../component/component-header/Header';
import UploadImage from '../../component/component-upload-image/UploadImage';
import imgIcon from '../../assets/add-assets/camera.png';

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
    photo: "",
  };
  const [upload, setupload] = useState(false);
  const [data, setData] = useState(addData);
  const handleSave = () => {
    // const formData = new FormData();
    // formData.append('photo', data.photo);
    // formData.append('firstName', data.firstName);
    // formData.append('lastName', data.lastName);

    const addData = {
      firstName : data.firstName,
      lastName : data.firstName,
      age : data.firstName,
      photo: "https://picsum.photos/200",
    }
    addContact(formData);
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
  const handlePhoto = (e) => {
    setData(prev => ({...prev, photo: e}));
  };
  return(
    <SafeAreaView 
      style={{ 
        flex:1,
        backgroundColor:'white'}}>
      <HeaderContact
        title={'Add Contact'}
        goBack={()=> navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{
        alignItems:'center',
        margin:5}}>
        <View style={{
          width:200,
          height:200,
          margin:5,
          borderWidth:1,
          borderRadius:100
        }}>
          <Image style={{
            resizeMode:'cover',
            borderRadius:100,
            width:'100%',
            height:'100%'
          }} 
          source={{uri: data.photo?.uri}}
          />
        </View>
        <TouchableOpacity onPress={()=>setupload(true)}>
          <Image 
            style={{
              width: 50,
              height: 50, 
            }}
            source={imgIcon}/>
        </TouchableOpacity>
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
        action={handleClose}/>
      <UploadImage
        setResponse={(e) => handlePhoto(e)}
        visible={upload}
        close={()=>setupload(false)}/>
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