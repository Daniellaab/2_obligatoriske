// Importerer nødvendige komponenter og funktioner fra React og React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApps, initializeApp } from "firebase/app";

// Importerer de forskellige skærme fra separate filer
import HomeScreen from './components/HomeScreen';
import AddCompanyScreen from './components/AddCompanyScreen';
import CreateCouponScreen from './components/CreateCouponScreen';
import AllCompaniesScreen from './components/AllCompaniesScreen';
import CouponsScreen from './components/CouponsScreen';
import CameraScreen from './components/CameraScreen';
import CompanyDetailsScreen from './components/CompanyDetailsScreen';
import MapScreen from './components/MapScreen';

// Opretter en staknavigator til at håndtere navigationen mellem skærmene
const Stack = createNativeStackNavigator();

// Hovedfunktionen, der definerer den samlede app-komponent
function App() {
// Firebase konfigurationsobjekt, der indeholder API-nøgler og andre opsætningsoplysninger
  const firebaseConfig = {
    apiKey: "AIzaSyBqAc41rPdwwSe7rzFBvKKVBTRdlXWL4VY",
    authDomain: "obligatoriske-9bcdb.firebaseapp.com",
    databaseURL: "https://obligatoriske-9bcdb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "obligatoriske-9bcdb",
    storageBucket: "obligatoriske-9bcdb.appspot.com",
    messagingSenderId: "701562793828",
    appId: "1:701562793828:web:e620095662826137d21471"
  };
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log('Firebase On!'); // Udskriver besked i konsollen, når Firebase er aktiveret
  }
  // Returafsnittet, der indeholder navigationscontaineren og staknavigator med alle skærme
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddCompany" component={AddCompanyScreen} />
        <Stack.Screen name="AllCompanies" component={AllCompaniesScreen} />
        <Stack.Screen name="CompanyDetails" component={CompanyDetailsScreen} />
        <Stack.Screen name="CreateCoupon" component={CreateCouponScreen} />
        <Stack.Screen name="Coupons" component={CouponsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name='Map' component={MapScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Eksporterer App-komponenten som standard eksport for at gøre den tilgængelig for resten af applikationen
export default App;