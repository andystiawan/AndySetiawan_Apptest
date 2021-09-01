import React, { useEffect, useState } from 'react';
import { 
  Image, 
  SafeAreaView, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View } from 'react-native';
import { connect } from 'react-redux';
import { styleds } from './styleds';
import {
  updateContact,
  closePopUp,
  getContact,
  deleteContact,
} from '../../component/component-redux/redux-action/ContactAction';
import AlertMessage from '../../component/component-alert/AlertMessage';
import HeaderContact from '../../component/component-header/Header';

function DetailContact({
  ContactReducer, 
  updateContact, 
  navigation,
  closePopUp, 
  deleteContact,
  getContact}){
  const detail = ContactReducer.detail_contact;
  const initialState = {
    edit : false,
    firstName : detail?.firstName,
    lastName: detail?.lastName,
    age: detail?.age
  }
  const [state, setstate] = useState(initialState);
  const inputStyle = {
    width:'80%',
    borderRadius:10,
    backgroundColor: state.edit ? '#99ffcc' : 'grey',
    margin:5
  }
  const handleEdit = () => {
    setstate(p => ({...p,edit: !state.edit}));
  }
  const handleSave = () => {
    const data = {
      firstName: state.firstName,
      lastName: state.lastName,
      age: state.age,
      photo: 'https://picsum.photos/200/300'
    }
    updateContact(data, detail?.id);
  }
  const handleClose = async() => {
    try {
      closePopUp();
      await getContact();
      navigation.navigate('Contact');
    } catch (error) {
      console.log(error);
    }
  };
  const handleHapus = async() => {
    deleteContact(detail?.id);
  }
  return(
    <SafeAreaView style={{
      flex:1,
      backgroundColor:'white'
    }}>
      <HeaderContact
        title={'Details Contact'}
        goBack={()=> navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{
        alignItems:'center',
        justifyContent:'center'
      }}>
        <View style={{
            width:150,
            height:150,
            margin:10,
            borderWidth: 1,
            borderRadius:100
        }}>
          <Image
           source={{uri: detail?.photo}}
           style={{
            resizeMode:'cover',
            borderRadius: 100,
            borderWidth: 1,
            width:'100%',
            height:'100%'
            
          }}/>
        </View>
        <View style={inputStyle}>
          <TextInput
           editable={state.edit}
           placeholder={detail?.firstName}
           onChangeText={(e)=> setstate(p => ({...p,firstName:e}))}
           value={state.firstName}/>
        </View>
        <View style={inputStyle}>
          <TextInput
           editable={state.edit}
           placeholder={detail?.lastName}
           onChangeText={(e)=> setstate(p => ({...p,lastName:e}))}
           value={state.lastName}/>
        </View>
        <View style={inputStyle}>
          <TextInput
           editable={state.edit}
           placeholder={detail?.age.toString()}
           keyboardType="number-pad"
           onChangeText={(e)=> setstate(p => ({...p,age:e}))}
           value={state.age.toString()}/>
        </View>
        <View>
          {state.edit ? 
            <View style={{width:'100%'}}>
              <TouchableOpacity 
                onPress={handleSave}
                disabled={
                  state.firstName === "" ||
                  state.lastName === "" ||
                  state.age === ""} 
                style={[styleds.btnSave,{
                  backgroundColor:
                  state.firstName === "" ||
                  state.lastName === "" ||
                  state.age === "" ?
                  'grey' : 'green'
                }]}>
                <Text style={styleds.txtSave}> SAVE </Text>
              </TouchableOpacity> 
              <TouchableOpacity
                onPress={handleEdit}
                style={styleds.btnCancel}>
                <Text style={{color:'white'}}> Cancel </Text>
              </TouchableOpacity>
            </View>
            :
            <View>
              <TouchableOpacity
                onPress={handleEdit}
                style={styleds.btnEdit}>
                <Text style={styleds.txtSave}> Edit </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleHapus}
                style={styleds.btnHapus}>
                <Text style={styleds.txtSave}> Hapus </Text>
              </TouchableOpacity>
            </View>
           
          }
        </View>
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
  ContactReducer : state.ContactReducer,
})

const mapDispatchToProps = {
  updateContact,
  closePopUp,
  getContact,
  deleteContact
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailContact);