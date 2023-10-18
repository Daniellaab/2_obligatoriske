import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApps, initializeApp } from "firebase/app";

import HomeScreen from './components/HomeScreen';
import CreateCompanyScreen from './components/CreateCompanyScreen';
import CreateCouponScreen from './components/CreateCouponScreen';
import AllCompaniesScreen from './components/AllCompaniesScreen';
import CouponsScreen from './components/CouponsScreen';


const Stack = createNativeStackNavigator();

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBqAc41rPdwwSe7rzFBvKKVBTRdlXWL4VY",
    authDomain: "obligatoriske-9bcdb.firebaseapp.com",
    projectId: "obligatoriske-9bcdb",
    storageBucket: "obligatoriske-9bcdb.appspot.com",
    messagingSenderId: "701562793828",
    appId: "1:701562793828:web:e620095662826137d21471"
  };
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log('Firebare On!');
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateCompany" component={CreateCompanyScreen} />
        <Stack.Screen name="CreateCoupon" component={CreateCouponScreen} />
        <Stack.Screen name="AllCompanies" component={AllCompaniesScreen} />
        <Stack.Screen name="Coupons" component={CouponsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;