import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contact from './contact/Contact';
import DetailContact from './contact/DetailContact';
import AddContact from './contact/AddContact';

const Stack = createNativeStackNavigator();

function Routes(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contact" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="DetailContact" component={DetailContact} />
        <Stack.Screen name="AddContact" component={AddContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;