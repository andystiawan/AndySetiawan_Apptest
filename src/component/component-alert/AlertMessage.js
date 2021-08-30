import React from 'react';
import { 
  Image,
  Modal, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View } from 'react-native';
import success from '../../assets/alert-assets/checked.png';
import failed from '../../assets/alert-assets/danger.png';

function AlertMessage({type, message, open, close, action}){
  return(
    <Modal
    animationType="fade"
    visible={open}
    onRequestClose={close ? close : null}
    transparent={true}>
      <View style={styled.container}>
        <View style={{
          width:'100%',
          justifyContent:'center',
          alignItems:'center'
        }}>
          {type === 'success' ? 
            <Image style={styled.image} source={success} /> : 
            <Image style={styled.image} source={failed}/>}
        </View>
        <View style={{flex:1}}>  
          <Text style={styled.text}>
            {message}
          </Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor:'green',
          borderRadius:15,
          marginBottom:5,
          width:'50%',
          height:'15%',
          justifyContent:'center',
          alignSelf:'center'
        }} onPress={action}>  
          <Text style={[styled.text, {color:'white'}]}>
             OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
export default AlertMessage;

const styled = StyleSheet.create({
  container:{
    width:'80%',
    height:'30%',
    borderRadius:30,
    backgroundColor:'white',
    alignSelf:'center',
    marginVertical:'50%',
    borderWidth:0.35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text:{
    fontSize:20,
    fontWeight:'700',
    textAlign:'center'
  },
  image:{
    height:'60%',
    resizeMode:'contain'
  }
})

