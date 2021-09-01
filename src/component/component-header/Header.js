import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View } from 'react-native';

function HeaderContact({goBack, title}) {
  return(
    <SafeAreaView style={styled.container}>
      <TouchableOpacity style={styled.backContainer} onPress={goBack}>
        <Text style={styled.back}> &#10094; </Text>
      </TouchableOpacity>
      <View>
        <Text style={styled.title}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  )
  
}

const styled = StyleSheet.create({
  container:{
    height:50,
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:0.5,

  },
  back:{
    fontSize:30,
    color:'aqua',
    textShadowColor:'blue',
    textShadowOffset:{
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
  },
  backContainer:{
    width:45,
    top:-1
  },
  title:{
    fontSize:24,
    color:'cyan',
    textShadowColor:'blue',
    textShadowOffset:{
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
  }
})

export default HeaderContact;