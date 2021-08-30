import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  Image, 
  SafeAreaView, 
  Text, 
  TouchableOpacity, 
  View } from 'react-native';
import { connect } from 'react-redux';
import {
  getContact,
  detailContact
} from '../../component/component-redux/redux-action/ContactAction';
import { styleds } from './styleds';


function Contact({
  getContact, 
  ContactReducer, 
  navigation,
  detailContact
}){
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getContact();
  }, [getContact]);
  const handleRefresh = async() => {
    try {
      setRefresh(true);
      await getContact();
      setRefresh(false);
    } catch (error) {
      
    };
  }
  const handleDetail = async (id) => {
    try {
      await detailContact(id);
      navigation.navigate('DetailContact');

    } catch (error) {
      console.log(error);
    }
  }
  const renderItem = (item) => {
    return(
      <TouchableOpacity onPress={()=>handleDetail(item?.id)} style={styleds.listContainer}>
        <View style={styleds.listImageContainer}>
          <Image style={styleds.listImage} source={{uri:item?.photo}}/>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={styleds.listName}>
            <Text style={styleds.txtNameContact}>{item?.firstName}</Text>
            <Text style={styleds.txtNameContact}>{item?.lastName}</Text>
          </View>
          <Text style={styleds.txtAgeContact}>Age : {item?.age}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return(
    <SafeAreaView style={{
      backgroundColor:'white',
      flex:1
    }}>
      <FlatList
        style={{flex:1}}
        data={ContactReducer.list_contact}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => renderItem(item)}
        onRefresh={handleRefresh}
        refreshing={refresh}
      />
      <TouchableOpacity 
        onPress={() => navigation.navigate('AddContact')} 
        style={styleds.addContactContainer}>
        <Text 
        style={{
          color:'white',
          fontSize:35,
        }}>
          +
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  ContactReducer :  state.ContactReducer,
})

const mapDispatchToProps = {
  getContact,
  detailContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

