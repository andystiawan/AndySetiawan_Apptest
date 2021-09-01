import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator,
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
  uploadImage,
} from '../../component/component-redux/redux-action/ContactAction';
import AlertMessage from '../../component/component-alert/AlertMessage';
import HeaderContact from '../../component/component-header/Header';
import imgIcon from '../../assets/add-assets/camera.png';
import UploadImage from '../../component/component-upload-image/UploadImage';

function DetailContact({
  ContactReducer, 
  updateContact, 
  navigation,
  closePopUp, 
  deleteContact,
  uploadImage,
  getContact}){
  const detail = ContactReducer.detail_contact;
  const initialState = {
    edit : false,
    firstName : detail?.firstName,
    lastName: detail?.lastName,
    age: detail?.age,
    photo: detail?.photo,
    loadingImg: false,
  }
  const [upload, setupload] = useState(false);
  const [state, setstate] = useState(initialState);
  const inputStyle = {
    backgroundColor: state.edit ? 'aquamarine' : '#f2f2f2',
  }
  const handleEdit = () => {
    setstate(p => ({...p,edit: !state.edit}));
  }
  const handleSave = () => {
    const data = {
      firstName: state.firstName,
      lastName: state.lastName,
      age: state.age,
      photo: state.photo
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
    await deleteContact(detail.id);
  };
  const handlePhoto = async(e) => {
    const formData = new FormData();
    formData.append('image', e)
    try {
      setstate(p => ({...p, loadingImg:true}));
      await uploadImage({
        item: formData,
        name: state.firstName || "Profile",
        response : (res) => setstate(p => ({...p, photo: res.url}))
      });
      setstate(p => ({...p, loadingImg:false}));
    } catch (error) {
      console.log(error);
    }
  };
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
          width:200,
          height:200,
          margin:5,
          borderWidth:1,
          borderColor:'aqua',
          borderRadius:100,
          alignItems:'center',
          justifyContent:'center'
        }}>
          {state.loadingImg ? 
            <ActivityIndicator size={'large'} color="cyan" /> : 
            <Image style={{
              resizeMode:'cover',
              borderRadius:100,
              width:'100%',
              height:'100%'
            }} 
            source={{uri: state.photo}}
            />
          }
        </View>
        <TouchableOpacity disabled={!state.edit} onPress={()=>setupload(true)}>
          <Image 
            style={{
              width: 50,
              height: 50, 
            }}
            source={imgIcon}/>
        </TouchableOpacity>
        <View style={[inputStyle, styleds.txtInputEdit]}>
          <TextInput
           editable={state.edit}
           placeholder={detail?.firstName}
           onChangeText={(e)=> setstate(p => ({...p,firstName:e}))}
           value={state.firstName}/>
        </View>
        <View style={[inputStyle, styleds.txtInputEdit]}>
          <TextInput
           editable={state.edit}
           placeholder={detail?.lastName}
           onChangeText={(e)=> setstate(p => ({...p,lastName:e}))}
           value={state.lastName}/>
        </View>
        <View style={[inputStyle, styleds.txtInputEdit]}>
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
       <UploadImage
        setResponse={(e) => handlePhoto(e)}
        visible={upload}
        close={()=>setupload(false)}/>
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
  deleteContact,
  uploadImage
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailContact);