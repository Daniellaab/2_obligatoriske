import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button title="Add Company" onPress={() => navigation.navigate('AddCompany')} />
      <Button title="All Companies" onPress={() => navigation.navigate('AllCompanies')} />
      <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
      <Button title="Create Coupon" onPress={() => navigation.navigate('CreateCoupon')} />
      <Button title="Coupons" onPress={() => navigation.navigate('Coupons')} />
      <Button title='Map' onPress={() => navigation.navigate('Map')}/>
    </View>
  );
};

export default HomeScreen;
