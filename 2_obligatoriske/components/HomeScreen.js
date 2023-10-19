import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button title="Add Company" onPress={() => navigation.navigate('AddCompany')} />
      <Button title="Create Company" onPress={() => navigation.navigate('CreateCompany')} />
      <Button title="Create Coupon" onPress={() => navigation.navigate('CreateCoupon')} />
      <Button title="All Companies" onPress={() => navigation.navigate('AllCompanies')} />
      <Button title="Coupons" onPress={() => navigation.navigate('Coupons')} />
    </View>
  );
};

export default HomeScreen;
