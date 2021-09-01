import { StyleSheet } from "react-native";

export const styleds = StyleSheet.create({
  listContainer: {
    flexDirection:'row',
    alignItems:'center',
    borderRadius: 15,
    paddingHorizontal:5,
    margin: 5,
    minHeight: 75,
    backgroundColor: '#f0f8ff',
    width:'95%',
    alignSelf:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listName:{
    flexDirection : 'row',
    width:'70%',
  },
  listImageContainer:{
    width:60,
    height:60,
    margin:5,
    borderRadius:50,
  },
  listImage:{
    resizeMode:'cover',
    borderRadius: 50,
    width:'100%',
    height:'100%'
  },
  txtNameContact:{
    fontWeight:'bold',
    fontSize: 18,
    marginHorizontal:5
  },
  txtAgeContact:{
    fontSize: 12,
    margin:5,
    fontWeight:'700'
  },
  addContactContainer:{
    width:55,
    height:55,
    backgroundColor:'green',
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:0,
    bottom:0,
    margin:25
  },
  txtInput:{
    borderRadius:10,
    width:'90%',
    backgroundColor:'#f2f2f2',
    borderWidth:0.5,
    borderColor:'aqua',
    borderBottomWidth:1,
    marginVertical:10
  },
  txtInputEdit:{
    borderRadius:10,
    width:'90%',
    borderWidth:0.5,
    borderColor:'aqua',
    borderBottomWidth:1,
    marginVertical:10
  },
  btnSave:{
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    width:'70%',
    minHeight:40
  },
  txtSave:{
    letterSpacing:5,
    fontWeight:'bold',
    fontSize:22,
    lineHeight:25,
    color:'white'
  },
  btnEdit:{
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    minHeight:40,
    margin:5,
    backgroundColor:'cyan'
  },
  btnHapus:{
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    minHeight:40,
    margin:5,
    backgroundColor:'red'
  },
  btnCancel:{
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    minHeight:40,
    margin:5,
    backgroundColor:'red'
  },
})